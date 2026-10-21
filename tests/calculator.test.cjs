const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculate, modules } = require('../catalog.js');
test('ejemplo comercial: una empresa, tres usuarios, ventas e inventario', () => {
  const r = calculate({ companies: 1, users: 3, databases: 0, selected: ['ventas', 'inventario'] });
  assert.equal(r.monthly, 69); assert.equal(r.annual, 828); assert.equal(r.warning, true);
});
test('módulos por empresa, usuarios y bases como cantidades totales', () => {
  const r = calculate({ companies: 2, users: 5, databases: 1, selected: modules.map(m => m.id) });
  assert.equal(r.moduleCost, 204); assert.equal(r.monthly, 289); assert.equal(r.annual, 3468);
});
test('base sin módulos y sin advertencia de selección', () => {
  const r = calculate({ companies: 1, users: 1, databases: 0, selected: [] });
  assert.equal(r.monthly, 25); assert.equal(r.warning, false);
});
test('cantidades negativas, vacías, fraccionarias o excesivas rechazadas', () => {
  for (const value of [-1, 0, 1.5, NaN, Infinity, 10001]) assert.throws(() => calculate({ companies: value, users: 1, databases: 0, selected: [] }), RangeError);
});
