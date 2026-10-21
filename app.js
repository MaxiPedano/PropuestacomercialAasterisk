(() => {
  'use strict';
  const { modules, calculate } = window.Proposal;
  const $ = s => document.querySelector(s);
  const money = value => 'USD ' + new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(value);
  $('#module-grid').innerHTML = modules.map((m, i) => `<article class="card module-card"><span class="module-number">MÓDULO / ${String(i + 1).padStart(2, '0')}</span><span class="module-status">${m.availability}</span><h3>${m.name}</h3><p>${m.description}</p><div class="price">${money(m.price)}<small>por empresa/mes · propuesto</small></div><button type="button" data-module="${m.id}" aria-haspopup="dialog">Explorar ${m.short} <span aria-hidden="true">↗</span></button></article>`).join('');
  $('#module-options').innerHTML = modules.map(m => `<label><input type="checkbox" value="${m.id}" ${['ventas', 'inventario'].includes(m.id) ? 'checked' : ''}><span>${m.short}</span><b>${money(m.price)}</b></label>`).join('');
  const dialog = $('#module-dialog');
  $('#module-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-module]');
    if (!button) return;
    const m = modules.find(m => m.id === button.dataset.module);
    $('#dialog-content').innerHTML = `<span class="tag">${m.availability}</span><h2 id="dialog-title">${m.name}</h2><p>${m.description}</p><ul>${m.features.map(f => `<li>${f}</li>`).join('')}</ul><h3>Dependencias operativas</h3><p>${m.dependencies}</p><p class="price">${money(m.price)} / empresa / mes</p><p class="note">Precio propuesto. Contratación independiente y disponibilidad productiva a confirmar.</p><a class="button" href="${m.documentation}" target="_blank" rel="noopener noreferrer">Ver documentación oficial ↗</a><p class="note">Videos oficiales: pendientes de configuración.</p>`;
    for (const resource of m.resources) {
      const paragraph = document.createElement('p');
      const link = document.createElement('a');
      link.href = resource.url;
      link.textContent = resource.name + ' ↗';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      paragraph.append(link);
      $('#dialog-content').append(paragraph);
    }
    dialog.showModal();
  });
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  function update() {
    try {
      const values = ['companies', 'users', 'databases'].map(id => $('#' + id).valueAsNumber);
      const selected = [...document.querySelectorAll('#module-options input:checked')].map(i => i.value);
      const result = calculate({ companies: values[0], users: values[1], databases: values[2], selected });
      $('#calc-error').textContent = '';
      $('#estimate-result').innerHTML = `<p class="total">${values[2] ? 'Desde ' : ''}${money(result.monthly)}</p><p class="total-label">por mes · suscripción</p><dl class="breakdown"><div><dt>Plataforma × ${values[0]}</dt><dd>${money(result.base)}</dd></div><div><dt>Usuarios × ${values[1]}</dt><dd>${money(result.userCost)}</dd></div><div><dt>Bases adicionales × ${values[2]}</dt><dd>${values[2] ? 'Desde ' : ''}${money(result.databaseCost)}</dd></div><div><dt>Módulos × ${values[0]} empresas</dt><dd>${money(result.moduleCost)}</dd></div></dl><div class="annual"><b>${values[2] ? 'Desde ' : ''}${money(result.annual)} / año</b><p class="total-label">Proyección de 12 mensualidades</p></div>`;
      $('#availability-warning').hidden = !result.warning;
    } catch {
      $('#calc-error').textContent = 'Ingresá cantidades enteras válidas: al menos una empresa y un usuario, y cero o más bases adicionales (máximo 10.000).';
      $('#estimate-result').textContent = 'Completá las cantidades para calcular.';
      $('#availability-warning').hidden = true;
    }
  }
  $('#calculator').addEventListener('input', update);
  $('#calculator').addEventListener('submit', e => e.preventDefault());
  update();
  const menu = $('.menu-toggle');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); $('#nav').classList.remove('open'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#nav').classList.toggle('open', open); });
  $('#nav').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  const links = [...document.querySelectorAll('#nav a')];
  const sections = links.map(a => document.querySelector(a.hash));
  function activeSection() {
    let active = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= 180) active = s.id;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) active = sections.at(-1).id;
    links.forEach(a => { if (a.hash === '#' + active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
  }
  let scheduled = false;
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(() => { activeSection(); scheduled = false; }); } }, { passive: true });
  activeSection();
})();
