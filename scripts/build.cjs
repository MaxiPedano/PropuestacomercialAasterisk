const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
for (const file of ['index.html', 'styles.css', 'catalog.js', 'app.js', 'preview.svg', 'preview.png']) {
  fs.copyFileSync(path.join(root, file), path.join(root, 'dist', file));
}
console.log('Build estático listo en dist/ (sin dependencias).');
