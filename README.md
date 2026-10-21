# AsteriskSuite · Alianza para estudios y consultoras

Presentación estática compatible con GitHub Pages. HTML, CSS y JavaScript sin dependencias de ejecución. Rama de trabajo: `feature/propuesta-simpla-gestion`.

## Revisar localmente

Abrir `index.html` o servir el repositorio con un servidor estático. La copia de enlaces usa Clipboard API cuando está disponible y ofrece copia manual como alternativa.

`npm test`: pruebas de cálculos y validación de cantidades.

`npm run build`: copia únicamente los archivos públicos a `dist/`. GitHub Pages también puede servir directamente la raíz. No se despliega automáticamente.

## Configuración

- `catalog.js`: precios, estados, dependencias, documentación, WhatsApp y textos para compartir.
- `index.html`: contenido comercial y metadatos sociales. Si cambia la URL pública, actualizar también los metadatos y `config.publicUrl`.
- `styles.css`: diseño responsive, impresión y reducción de movimiento.
- `app.js`: interacción, calculadora, diálogo accesible y compartir.
- `ANALISIS.md`: evidencia funcional, limitaciones y decisiones comerciales pendientes.
- `preview.svg` y `preview.png`: imagen original de la alianza sin logos de terceros; metadatos sociales apuntan al PNG de 1200×630.

## Verificaciones realizadas

- `npm test`: cuatro casos aprobados (ejemplo comercial, varias empresas, sin módulos, entradas inválidas).
- `npm run build`: salida estática generada correctamente.
- Edge headless con Playwright temporal, sin dependencia añadida al proyecto: diálogo, Escape y retorno de foco, calculadora y error de cantidades, advertencia de disponibilidad, destinos de navegación, menú móvil, URLs de compartir y copia con alternativa manual.
- Sin desbordamiento horizontal en 360, 768, 1200 y 1440 px; sin errores JavaScript durante la prueba.
- Once enlaces oficiales del sitio y catálogo respondieron HTTP 200. Compartir se verificó por URLs; no se publicaron mensajes en redes. La vista previa social en producción queda pendiente de despliegue autorizado.
- Prueba opcional reproducible: `node scripts/browser-check.cjs` con Playwright disponible en el entorno y Edge instalado. `--preview` regenera el PNG desde el SVG.

Los precios son propuestos. La documentación alpha no confirma producción. No se identificaron videos oficiales; `youtube` queda sin configurar. El botón WhatsApp es contacto comercial, no una integración del ERP.

La propuesta anterior está en `legacy/`, excluida de git y del build. Su versión anterior sigue existiendo en el historial del repositorio.
