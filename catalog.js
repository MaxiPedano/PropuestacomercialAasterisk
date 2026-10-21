(function (root) {
  const docs = 'https://docs.asterisksuite.cloud/';
  const config = {
    publicUrl: 'https://maxipedano.github.io/PropuestacomercialAasterisk/',
    whatsapp: '5493534746217',
    shareText: 'Conocé la propuesta de alianza de AsteriskSuite para estudios y consultoras.',
    contactText: 'Hola, quisiera información sobre la alianza de AsteriskSuite para estudios y consultoras.',
    rates: { base: 20, user: 5, database: 20 },
    youtube: null
  };
  const modules = [
    { id: 'ventas', name: 'Ventas y cuentas corrientes', short: 'Ventas', price: 15, description: 'Un recorrido comercial organizado, desde el presupuesto hasta el cobro.', features: ['Presupuestos y órdenes de venta', 'Remitos y facturación', 'Cobros y consulta de ventas'], dependencies: 'Productos, clientes y numeración. Cobros y cuentas corrientes se relacionan con Tesorería; inclusión comercial a confirmar.', path: 'procesos/ventas/' },
    { id: 'compras', name: 'Compras y proveedores', short: 'Compras', price: 15, description: 'Organizá el abastecimiento y la documentación de tus proveedores.', features: ['Órdenes de compra', 'Recepciones y facturas', 'Pagos e importadores documentados'], dependencies: 'Proveedores y productos. Recepciones vinculadas a stock; pagos relacionados con Tesorería.', path: 'procesos/compras/' },
    { id: 'inventario', name: 'Inventario y depósitos', short: 'Inventario', price: 19, description: 'Información de existencias para coordinar la operación de cada depósito.', features: ['Disponibilidad de stock', 'Reposición', 'Picking y pallets'], dependencies: 'Productos, depósitos y ubicaciones. Se integra con los movimientos de compras y ventas.', path: 'procesos/stock/' },
    { id: 'tesoreria', name: 'Tesorería y cajas', short: 'Tesorería', price: 19, description: 'Conectá la operación comercial con el seguimiento financiero.', features: ['Cajas y bancos', 'Cheques y tarjetas', 'Cuentas corrientes y reportes'], dependencies: 'Cuentas y medios de pago. Ventas y Compras alimentan los circuitos de cobros y pagos.', path: 'procesos/tesoreria/' },
    { id: 'logistica', name: 'Logística y remitos', short: 'Logística', price: 19, description: 'Coordiná despachos, viajes y documentación de la operación.', features: ['Órdenes de despacho y viajes', 'Flota, corredores y tarifas', 'Mantenimiento y seguimiento de cubiertas'], dependencies: 'Flota y ubicaciones. El circuito documentado conecta OV → despacho → remito → factura. Viaje y remito pueden gestionarse independientemente.', path: 'procesos/logistica/implementacion/' },
    { id: 'reportes', name: 'Reportes y análisis', short: 'Reportes avanzados', price: 15, description: 'Consultá información gerencial de los procesos registrados.', features: ['Reporte consolidado', 'Documentos y partes interesadas', 'Tesorería, inventario y logística'], dependencies: 'Datos registrados en las áreas consultadas y permisos. Alcance del paquete avanzado a confirmar.', path: 'procesos/reportes/' }
  ].map(m => ({ ...m, status: 'documentado', productionReady: false, availability: 'Documentado · producción a validar', documentation: docs + m.path, videos: [] }));
  function calculate({ companies, users, databases, selected }) {
    for (const [name, value, min] of [['companies', companies, 1], ['users', users, 1], ['databases', databases, 0]]) {
      if (!Number.isSafeInteger(value) || value < min || value > 10000) throw new RangeError('Cantidad inválida: ' + name);
    }
    const chosen = modules.filter(m => selected.includes(m.id));
    const base = companies * config.rates.base;
    const userCost = users * config.rates.user;
    const databaseCost = databases * config.rates.database;
    const moduleCost = companies * chosen.reduce((sum, m) => sum + m.price, 0);
    const monthly = base + userCost + databaseCost + moduleCost;
    return { base, userCost, databaseCost, moduleCost, monthly, annual: monthly * 12, warning: chosen.some(m => !m.productionReady) };
  }
  const api = { config, modules, calculate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Proposal = api;
})(typeof window !== 'undefined' ? window : globalThis);
