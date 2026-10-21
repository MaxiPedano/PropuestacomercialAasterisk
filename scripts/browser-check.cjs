// Verificación opcional: requiere Playwright en el entorno, no en producción.
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const file = path.join(root, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
  fs.readFile(file, (err, data) => { if (err) res.writeHead(404).end(); else { res.setHeader('Content-Type', types[path.extname(file)] || 'text/plain'); res.end(data); } });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    await page.goto(base);
    await page.locator('#module-grid button').first().click();
    assert.equal(await page.locator('dialog').evaluate(d => d.open), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').evaluate(d => d.open), false);
    assert.equal(await page.locator('#module-grid button').first().evaluate(e => e === document.activeElement), true);
    assert.match(await page.locator('#estimate-result').innerText(), /USD 69/);
    await page.locator('#companies').fill('2');
    assert.match(await page.locator('#estimate-result').innerText(), /USD 123/);
    await page.locator('#companies').fill('0');
    assert.match(await page.locator('#calc-error').innerText(), /cantidades enteras/);
    await page.locator('#companies').fill('1');
    assert.equal(await page.locator('#availability-warning').isVisible(), true);
    for (const link of await page.locator('#nav a').all()) {
      const hash = await link.getAttribute('href');
      assert.equal(await page.locator(hash).count(), 1);
    }
    const shares = await page.locator('#share-buttons a').evaluateAll(as => as.map(a => a.href));
    for (const link of shares) assert.ok(decodeURIComponent(link).includes('https://maxipedano.github.io/PropuestacomercialAasterisk/'));
    assert.match(await page.locator('.contact-link').getAttribute('href'), /5493534746217/);
    await page.locator('#copy-link').click();
    assert.ok((await page.locator('#copy-status').innerText()).length > 0);
    for (const width of [360, 768, 1200, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
    }
    await page.setViewportSize({ width: 360, height: 800 });
    await page.locator('.menu-toggle').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('#nav a[href="#precios"]').click();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
    assert.equal(errors.length, 0, errors.join('\n'));
    console.log('Navegación, diálogo/ESC/foco, calculadora, validación, compartir, menú móvil y responsive: OK.');
    const external = await page.locator('a[href^="https://"]').evaluateAll(as => [...new Set(as.map(a => a.href))].filter(url => /docs\.asterisksuite|dev\.asterisksuite|asteriskconsultora\.com/.test(url)));
    const { modules } = require('../catalog.js');
    for (const url of new Set([...external, ...modules.map(m => m.documentation)])) {
      try { const response = await fetch(url, { signal: AbortSignal.timeout(20000) }); console.log(`${response.status} ${url}`); }
      catch (error) { console.log(`NO VERIFICADO ${url}: ${error.message}`); }
    }
    if (process.argv.includes('--preview')) {
      await page.setViewportSize({ width: 1200, height: 630 });
      await page.goto(base + '/preview.svg');
      await page.screenshot({ path: path.join(root, 'preview.png') });
      console.log('Preview PNG 1200×630 generada.');
    }
  } finally { if (browser) await browser.close(); server.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
