# Análisis funcional previo y decisiones

Fuentes consultadas el 21/10/2026: propuesta pública, landing de AsteriskSuite, documentación oficial y Asterisk Consultora. Todas accesibles. Documentación: v0.83.0-alpha, revisión 20/10/2026. Evidencia documental, no prueba de producción.

## Catálogo

`catalog.js` contiene las seis categorías propuestas, funciones, precios, dependencias operativas, estado, documentación y videos. Ventas, Compras, Stock, Tesorería, Logística y Reportes figuran en la documentación oficial. La guía de implementación logística verifica el recorrido OV → despacho → remito → factura y la independencia entre planificación de viaje y remito.

Las seis categorías pueden proponerse como unidades comerciales, pero su contratación independiente y los permisos de habilitación no están confirmados. Las relaciones operativas no se convierten en requisitos de compra automáticos. Cuentas corrientes corresponde documentalmente a Tesorería: evitar doble cobro con Ventas. Fabricación/BOM, RRHH y operaciones internacionales están documentados, fuera del alcance tarifado de esta propuesta.

## No verificado

Producción de cada módulo; separación comercial efectiva; alcance de Reportes avanzados; asientos y balances contables anunciados en landing; videos oficiales; plantillas generales de migración; disponibilidad de entornos de prueba; herramientas automáticas de diagnóstico y asistentes. No se identificaron fuentes para afirmar que estas funciones estén en desarrollo. IA y WhatsApp integrado son iniciativas futuras no disponibles según el encargo.

La documentación y los manuales web existen. Existe guía de implementación de Logística e índice de importadores de Compras; esto no acredita una migración universal. La recomendación de usar una empresa de prueba no acredita un entorno provisionado.

## Contacto y recursos

No se identificó YouTube en las fuentes consultadas: configuración pendiente. WhatsApp 5493534746217 confirmado por el usuario. La consultora también publica una variante sin 9, no usada. Planes de soporte enlazados sin reproducir ni reinterpretar horas. La página llamada «Capturas» documenta carga de comprobantes por foto/PDF, no capturas de pantalla del ERP. Se enlaza como guía funcional. No se identificaron imágenes del ERP reutilizables en las páginas analizadas; no se simulan pantallas.

## Condiciones a acordar

Precios sujetos a aprobación. Usuarios totales en la simulación; tratamiento de usuarios compartidos entre empresas pendiente. Mismos módulos para todas las empresas simuladas. Bases adicionales desde USD 20. Anual = 12 mensualidades. Impuestos, tipo de cambio, facturación, reventa, captación cruzada, inclusión de habilitación en presupuesto final, calendario SLA y disponibilidad productiva pendientes.

Se reemplazó Simpla por Estudio asociado a pedido del usuario. Sin sección de validación de alianza. Piloto de 90 días solo como condición opcional. El cargo ARS 200.000 lo percibe Asterisk cuando implementa el estudio. Propuesta anterior conservada localmente en `legacy/` e ignorada por git; el historial previo ya existe en git.
