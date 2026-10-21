# AsteriskSuite · Alianza para estudios y consultoras

Presentación estática compatible con GitHub Pages. HTML, CSS y JavaScript sin dependencias de ejecución. Rama de trabajo: `feature/propuesta-simpla-gestion`.

## Revisar localmente

Abrir `index.html` o servir el repositorio con un servidor estático. La propuesta está dirigida al destinatario y no incluye botones de contacto ni compartir.

`npm test`: pruebas de cálculos y validación de cantidades.

`npm run build`: copia únicamente los archivos públicos a `dist/`. GitHub Pages también puede servir directamente la raíz. No se despliega automáticamente.

## Configuración

- `catalog.js`: catorce módulos, precios, estados, dependencias y documentación. Fabricación incluye Costos en su tarifa; Operaciones internacionales tiene tarifa superior.
- `index.html`: contenido comercial y metadatos sociales. Si cambia la URL pública, actualizar también los metadatos y `config.publicUrl`.
- `styles.css`: diseño responsive, impresión y reducción de movimiento.
- `app.js`: interacción, calculadora y diálogo accesible.
- `ANALISIS.md`: evidencia funcional, limitaciones y decisiones comerciales pendientes.
- `preview.svg` y `preview.png`: imagen original de la alianza sin logos de terceros; metadatos sociales apuntan al PNG de 1200×630.

## Verificaciones realizadas

- `npm test`: cinco casos (ejemplo comercial, varias empresas, sin módulos, entradas inválidas y Fabricación/Costos con Operaciones internacionales y Fletes).
- `npm run build`: salida estática generada correctamente.
- Edge headless con Playwright temporal, sin dependencia añadida al proyecto: diálogo, Escape y retorno de foco, calculadora con 14 módulos y error de cantidades, advertencia de disponibilidad, destinos de navegación, menú móvil y ausencia de botones de contacto/compartir.
- Sin desbordamiento horizontal en 360, 768, 1200 y 1440 px; sin errores JavaScript durante la prueba.
- El script de navegador verifica los enlaces oficiales del sitio, catálogo y recursos adicionales. La imagen PNG permanece en los metadatos para vistas previas de la URL, sin botones de difusión en la propuesta.
- Prueba opcional reproducible: `node scripts/browser-check.cjs` con Playwright disponible en el entorno y Edge instalado. `--preview` regenera el PNG desde el SVG.

Los precios son propuestos. La documentación alpha no confirma producción. No se identificaron videos oficiales; `youtube` queda sin configurar. IA y WhatsApp integrado se mantienen como funciones futuras no disponibles.

La propuesta anterior está en `legacy/`, excluida de git y del build. Su versión anterior sigue existiendo en el historial del repositorio.
