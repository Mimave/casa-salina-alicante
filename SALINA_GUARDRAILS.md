# Salina — alcance, guardrails y operación del prototipo

## Resumen ejecutivo

Casa Salina es un prototipo de web boutique con reserva directa guiada. Salina es la anfitriona digital: orienta al visitante, recoge preferencias de estancia y prepara una solicitud. No es todavía un motor de reservas, no confirma pagos ni disponibilidad real y no sustituye al equipo humano.

El objetivo es reducir dudas repetitivas, facilitar una estancia cómoda y llevar al huésped hacia una solicitud directa, transparente y sin comisiones de intermediarios.

## Qué resuelve hoy

- Presenta suites, experiencias, galería, preguntas frecuentes y contacto con una identidad premium coherente.
- Guía una solicitud de estancia con fechas, huéspedes, mascota y una estimación visible.
- Ayuda a Salina a recomendar una opción según el motivo del viaje.
- Hace explícitas necesidades habituales: mascotas, edades, bebé, accesibilidad y preferencias de llegada.
- Tiene experiencia en español e inglés.
- Deja preparado el puente a contacto humano y a WhatsApp Business, sin fingir que esté conectado.
- Mide visitas y páginas vistas de forma agregada con Vercel Analytics.
- La orientación rápida se limita a cinco pasos. En el penúltimo muestra un aviso visible de cierre para no alargar la conversación innecesariamente.

## Límites actuales, dichos con honestidad

- La disponibilidad y el precio son **orientativos** en esta demo.
- No hay cobro, confirmación automática ni sincronización con un PMS o channel manager.
- No se envían datos a WhatsApp, proveedores locales ni a un humano todavía.
- Los servicios locales futuros no serán vendidos ni cobrados por Casa Salina: el cliente contratará directamente con cada proveedor.
- El borrador se conserva localmente en el navegador del visitante mientras escribe; no sustituye una reserva real ni un respaldo de servidor.

## Continuidad ante cortes

- El formulario guarda cada cambio del borrador en el dispositivo del visitante para poder recuperarlo tras un corte de conexión o una recarga.
- La aplicación instala una caché progresiva: después de una visita con conexión, puede volver a abrir la interfaz si la red falla.
- No se guardan contraseñas ni accesos de administración en el navegador. Los accesos al PMS, correo, pagos, WhatsApp Business y despliegue deben residir en proveedores autorizados con MFA y copias de seguridad.
- Para la versión comercial, el motor de reservas debe confirmar la solicitud en servidor, mantener historial y aplicar copias cifradas, retención y restauración documentadas. El almacenamiento local es una ayuda de continuidad, no el sistema de verdad.

## Alcance permitido de Salina

Salina puede hablar únicamente de:

1. Casa Salina, sus suites, servicios, normas y experiencias.
2. Fechas, huéspedes, mascota, accesibilidad y preferencias de estancia.
3. Precio estimado y proceso de solicitud directa.
4. Información práctica verificada: llegada, salida, contacto, entorno y servicios locales aprobados.
5. Derivación al equipo humano para confirmar, modificar o resolver una solicitud.

## Restricciones obligatorias

Salina no debe:

- Inventar disponibilidad, precios definitivos, políticas, descuentos, proveedores o tiempos de respuesta.
- Confirmar una reserva, un pago, una cancelación o un cambio sin el motor de reservas y el equipo autorizado.
- Solicitar datos bancarios, documentos de identidad, contraseñas, datos médicos o información sensible innecesaria.
- Dar consejo médico, legal, financiero o de seguridad. En urgencias debe indicar que contacten a los servicios locales de emergencia.
- Mantener conversaciones ajenas al alojamiento: política, contenido ofensivo, debate general, tareas personales o consultas que no tengan relación con Casa Salina.
- Presentarse como humana o esconder la derivación a una persona.

## Respuesta segura fuera de alcance

**ES:** «Puedo ayudarte con Casa Salina, sus estancias y servicios. Para este asunto, te pongo en contacto con nuestro equipo.»

**EN:** “I can help with Casa Salina, its stays and services. For this matter, I will connect you with our team.”

## Cuándo debe intervenir una persona

- El huésped pide hablar con alguien.
- Confirmación de reserva, pago, cancelación, factura, cambio o reclamación.
- Accesibilidad compleja, necesidad sanitaria o situación urgente.
- Petición de un servicio local que no esté verificado.
- Preguntas fuera del alcance o información que Salina no puede confirmar.

## Privacidad y transparencia

- Pedir solo los datos necesarios para preparar la solicitud.
- Explicar para qué se usarán antes de enviarlos a un canal real.
- Mantener los datos de reservas en el PMS o motor elegido, no en el navegador.
- Mostrar siempre que Salina es una anfitriona digital y que el equipo puede tomar el relevo.

## Aplicación en la demo actual

La web no incluye un campo de texto abierto. Salina trabaja con botones y flujos definidos, por lo que la conversación no puede desviarse a temas externos. Además, el widget declara visualmente su alcance en español e inglés.

Cuando se conecte WhatsApp o un agente con IA, estas mismas reglas deben estar en el prompt de sistema **y** en una capa de validación del servidor. Un prompt por sí solo no es una barrera suficiente.

## Uso responsable de modelos y tokens

La asignación práctica recomendada para Codex es:

| Modelo | Úsalo para | Evítalo para |
| --- | --- | --- |
| Luna | Texto corto, revisar una captura, preguntas simples y microcopy. | Decisiones de arquitectura, seguridad o cambios delicados. |
| Tierra | Trabajo diario: implementar, probar, documentar y preparar despliegues. | Análisis excepcionalmente complejo si requiere mucha investigación. |
| Sol | Arquitectura, depuración difícil, revisión final, seguridad y decisiones de alto impacto. | Iteraciones menores de diseño o comandos rutinarios. |

Para aprovechar mejor los tokens:

1. Agrupar cambios relacionados en una sola petición con resultado esperado y criterio de terminado.
2. Mantener este mismo chat y enlazar capturas reales, en vez de repetir todo el contexto.
3. Pedir una lista de archivos y una verificación antes de hacer `commit` y `push`.
4. Reservar Sol para los puntos que realmente cambian el rumbo; Tierra es el modo de trabajo habitual.
5. No usar IA para reglas estáticas que el código puede garantizar, como el alcance de botones de Salina.
6. Cerrar cada bloque con un cambio pequeño, un commit descriptivo y una comprobación visual.

## Inversión, tiempos y coste profesional

No presentamos este proyecto como «hecho por cero». Aunque una herramienta pueda tener un plan gratuito, el valor se compone de diagnóstico, estrategia, diseño, desarrollo, pruebas, publicación, documentación, mantenimiento y responsabilidad sobre el resultado.

### Lo realizado en el piloto Casa Salina

- **Calendario:** sesiones de definición, construcción, pruebas y despliegues entre el 14 y el 16 de julio de 2026.
- **Entregables:** identidad visual, web responsive, simulador de solicitud, Salina bilingüe, accesibilidad/pet-friendly como parte del flujo, repositorios, Vercel, analítica, guardrails y documentación operativa.
- **Infraestructura:** GitHub, Vercel, Vercel Analytics y GitHub CLI.
- **Tiempo de despliegue:** los builds completaron aproximadamente en 9–15 segundos. No es tiempo de desarrollo ni debe confundirse con las horas de creación.

No se registraron horas activas por bloque desde el inicio, por lo que no se debe inventar una cifra retrospectiva. Desde ahora, cada cliente debe tener una estimación aprobada y una hoja de cambios.

### Costes de herramientas que debe asumir un cliente comercial

| Categoría | Cómo presupuestarla |
| --- | --- |
| Dominio y correo corporativo | Contratados y pagados directamente por el cliente. |
| Hosting y despliegue | Vercel Hobby sirve para proyectos personales, no para uso comercial. Para clientes, presupuestar como mínimo Vercel Pro por desarrollador y el consumo adicional. |
| Motor de reservas / PMS / channel manager | Proveedor elegido por el alojamiento; presupuesto separado según habitaciones, canales y automatizaciones. |
| WhatsApp Business / telefonía | Número, plantilla, proveedor/API y volumen de conversaciones; contratado por el cliente. |
| IA y agente | Presupuesto mensual según conversaciones, modelo, idiomas, conocimiento y supervisión humana. |
| Privacidad, cookies y textos legales | Revisión profesional cuando haya datos reales, pagos o automatización. |
| Mantenimiento | Cuota mensual separada del desarrollo inicial. |

Vercel publica Pro desde 20 USD por mes e incluye crédito de uso; el coste puede crecer con tráfico, funciones, almacenamiento o servicios adicionales. Confirmar siempre límites y consumo antes de firmar una propuesta comercial. [Precios oficiales de Vercel](https://vercel.com/pricing)

### Modelo de presupuesto recomendado — sin IVA ni servicios de terceros

Estas son bandas internas para preparar una propuesta. No son una tarifa automática: se confirman después de una reunión de alcance.

| Tipo de negocio | Alcance inicial | Estimación de trabajo | Implementación orientativa | Mantenimiento mensual orientativo |
| --- | --- | ---: | ---: | ---: |
| Pequeño | Web de 1–5 páginas, formulario/solicitud, SEO básico, analítica y 1 idioma. | 35–60 h | 1.800–3.500 EUR | 150–350 EUR |
| Mediano | Web con varias líneas de servicio, 2 idiomas, CMS o reservas, analítica y automatizaciones básicas. | 70–120 h | 4.500–9.000 EUR | 400–900 EUR |
| Grande | Múltiples sedes o unidades, integraciones, roles, seguridad, QA ampliado y SLA. | 140–300 h | 12.000–30.000 EUR | 1.200–3.000 EUR |

Para un alojamiento como Casa Salina, la propuesta comercial natural sería **Reserva directa**: diseño premium + motor de reservas/PMS + analítica + una fase posterior de Salina conectada. La integración real con PMS, WhatsApp o IA se cotiza como módulo, nunca se regala dentro de una web estática.

### Qué incluye la cuota de mantenimiento

- Actualizaciones de contenido y una bolsa de cambios menores.
- Supervisión de disponibilidad, dominio, formulario, despliegues y analítica.
- Revisión mensual de seguridad básica, rendimiento y enlaces.
- Copia de seguridad y protocolo de reversión cuando haya sistemas conectados.
- Informe breve con actividad, incidencias, mejoras y horas consumidas.

Debe indicar con claridad lo que queda fuera: nuevas páginas, rediseños, fotografía, traducción profesional, campañas, integración nueva, costes de proveedor, soporte fuera de horario y desarrollo no incluido en la bolsa mensual.

## Paquetes posibles para futuros clientes

1. **Esencial:** web, contenido, formulario de consulta, analítica y mantenimiento básico.
2. **Reserva directa:** lo anterior más integración con PMS/motor de reservas y sincronización real de disponibilidad.
3. **Anfitriona conectada:** lo anterior más Salina en WhatsApp Business, derivación humana, base de conocimiento y revisiones periódicas de seguridad.

Siempre separar cuatro líneas en la propuesta: implementación inicial, cuota de mantenimiento, proveedores externos y cambios fuera de alcance.

## Próximas etapas

1. Elegir PMS o motor de reservas como fuente única de disponibilidad y precios.
2. Definir número de WhatsApp Business, horario humano y protocolo de escalado.
3. Cargar datos verificados de Casa Salina y aprobar servicios locales por comunidad.
4. Medir el embudo con analítica agregada y, si el plan lo permite, eventos consentidos.
5. Probar el viaje completo: visita, solicitud, respuesta humana, reserva y seguimiento.
