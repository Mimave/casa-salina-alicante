# PRD · Web Casa Salina Alicante

## 1. Objetivo
Crear una web pública, responsive y diferenciada para Casa Salina Alicante que presente el alojamiento, sus suites y experiencias, y convierta visitas en solicitudes de reserva directa.

## 2. Alcance de S3
- Aplicación React + TypeScript construida con Vite.
- Una landing page de alto impacto visual.
- Publicación compatible con Vercel.
- Datos y reserva simulados; sin cobro ni backend en esta fase.

## 3. Secciones obligatorias
1. Portada con imagen inmersiva, propuesta de valor y CTA.
2. Presentación del alojamiento.
3. Habitaciones/suites con precio y características.
4. Experiencias y entorno.
5. Galería interactiva.
6. Formulario/contacto o solicitud de estancia.
7. Preguntas frecuentes.
8. Footer con datos y enlaces legales.

## 4. Funcionalidades
- Menú responsive y navegación por anclas.
- Tarjetas animadas de suites.
- Selector de suite.
- Campos de entrada y salida.
- Contador de huéspedes.
- Cálculo instantáneo de noches y precio estimado.
- Toast de confirmación de demo.
- Galería con lightbox, flechas, Escape y teclado.
- FAQs desplegables.
- CTA que desplaza a reservas.
- Layout mobile first y reduced motion.

## 5. Contenido
- Marca: Casa Salina Alicante.
- Tipo: boutique stay / alojamiento urbano mediterráneo.
- Inventario mostrado: Suite Sal, Suite Arena y Suite Brisa.
- Ubicación ficticia de demo: Calle del Mar, 18, Alicante.
- Teléfono y correo ficticios de demo.
- Imágenes de stock remotas como placeholders.

## 6. Requisitos no funcionales
- Build sin errores de TypeScript.
- Carga inicial ligera para una demo visual.
- HTML semántico y textos alternativos.
- Sin secretos ni variables privadas.
- Compatible con navegadores modernos.
- Publicable en Vercel mediante importación de repositorio o subida de proyecto.

## 7. Fuera de alcance en S3
- Disponibilidad real.
- Pago Stripe.
- Panel de administración.
- Base de datos.
- Emails transaccionales.
- Agente conversacional.

## 8. Evolución S4
Conectar el formulario con un motor de reservas o API, añadir Stripe, disponibilidad real, correo de confirmación y un agente de IA contextual.

## 9. Criterios de aceptación
- La URL pública carga sin contraseña.
- Funciona en móvil y escritorio.
- Todas las secciones obligatorias son visibles.
- La galería y FAQs son interactivas.
- El cálculo de estancia responde a fechas y suite.
- No hay errores de consola críticos ni errores de build.
