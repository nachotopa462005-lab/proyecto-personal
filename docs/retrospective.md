# Retrospectiva final

## Reflexion general

Durante este proyecto senti que pase de tener una idea bastante simple a construir una aplicacion mucho mas completa y ordenada de lo que imaginaba al principio. La idea inicial era hacer una app para controlar gastos personales, pero con el paso de las fases fui entendiendo que no se trataba solo de "hacer pantallas", sino de conectar bien el frontend, el backend, la API, los tipos y la experiencia de uso.

Al principio me centre mas en que la interfaz funcionara, pero despues fui viendo la importancia de tener una estructura clara, componentes reutilizables, rutas bien definidas, formularios controlados, estado global cuando hacia falta y una API que tuviera sentido con lo que mostraba la app. Eso hizo que el proyecto dejara de ser solo una demo visual y pasara a parecerse mas a una aplicacion real.

## Lo que aprendi

Una de las cosas que mas aprendi fue a conectar frontend y backend de una manera mas ordenada. En el frontend trabaje con React y TypeScript, creando componentes, hooks, contexto, rutas y formularios. En el backend use Express con una arquitectura por capas, separando rutas, controladores, servicios y validaciones. Antes de este proyecto entendia esas partes mas por separado; aca pude ver claramente como una decision en el backend afecta a la UI, y como un cambio en el frontend a veces obliga a redefinir contratos de datos o validaciones.

Tambien aprendi bastante sobre el valor de TypeScript. Muchas veces puede parecer que agregar tipos hace todo mas largo, pero en este proyecto me ayudo a evitar errores y a tener mas claridad sobre que esperaba cada parte del sistema. Tener tipadas las respuestas de la API, los formularios y los datos de dominio me sirvio para trabajar con mas seguridad.

Otro aprendizaje importante fue entender mejor la diferencia entre estado local, estado global y datos del servidor. Al principio algunas cosas estaban en localStorage o en datos de ejemplo, pero a medida que el proyecto crecio fui viendo que los datos importantes tenian que venir del backend si queria que la app fuera coherente.

## Como conecte frontend, backend y API

La forma en la que termine conectando todo fue bastante clara:

- el frontend se encarga de mostrar la interfaz y capturar las acciones del usuario;
- la capa de red del frontend hace las peticiones HTTP;
- la API recibe esas peticiones y valida los datos;
- los controladores delegan en servicios;
- los servicios aplican la logica y devuelven la respuesta;
- luego el frontend actualiza la UI con esos resultados.

Esto se nota, por ejemplo, en los movimientos y en el presupuesto mensual. El usuario escribe el importe en un formulario del frontend, ese dato se transforma y se valida, se envia a la API, el backend lo guarda y despues el frontend vuelve a reflejar el nuevo estado. Lo mismo pasa con las categorias y con el presupuesto, que ya no son solo datos "dibujados" en pantalla sino parte real de la logica de la aplicacion.

## Principales problemas que encontre

Uno de los problemas mas claros fue la integracion entre frontend y API. Durante el proyecto hubo momentos en los que la interfaz usaba datos locales mientras el backend ya empezaba a existir, y eso generaba desajustes. Por ejemplo, podia pasar que una vista pareciera correcta pero en realidad no estuviera usando todavia la API como fuente de verdad. Corregir eso me ayudo a entender mejor en que momento conviene dejar de usar mocks o localStorage.

Otro problema importante fue el manejo de tipos. Al cambiar contratos del backend, tambien habia que actualizar tipos del frontend, respuestas de la API y formularios. Si una propiedad cambiaba o si se agregaban campos como `createdAt`, `updatedAt` o el presupuesto mensual, habia que revisar varias capas para que todo siguiera encajando bien.

Tambien me encontre con problemas mas practicos, como las rutas en produccion, la configuracion de variables de entorno, los avisos de Git con carpetas anidadas, los detalles del despliegue en Vercel y algunos errores al arrancar o validar el backend. No fueron problemas "de idea", sino los tipicos problemas reales que aparecen cuando una aplicacion deja de estar solo en local y empieza a desplegarse de verdad.

Por ultimo, uno de los detalles que mas me obligo a pensar en la experiencia de usuario fue el manejo de importes. Al principio los montos se trataban en centimos internamente y eso era correcto a nivel tecnico, pero para el usuario era incomodo tener que escribir dos ceros extra. Cambiar eso para que se pudieran escribir comas y puntos de manera natural fue un buen ejemplo de como una solucion tecnica no siempre es suficiente si no esta adaptada al uso real.

## Como utilice la IA durante el desarrollo

La IA fue de gran ayuda durante todo el proyecto. No la use solo para "hacer cosas rapido", sino sobre todo para llevar la idea a un nivel mas profesional y mejor organizado. Me ayudo a pensar la arquitectura, a revisar decisiones, a detectar errores, a conectar frontend y backend, a ordenar la documentacion y a pulir detalles que seguramente yo solo habria tardado mucho mas en resolver.

Algo que valoro bastante es que la IA no reemplazo mis decisiones, sino que me sirvio para convertir mis opiniones y mis objetivos en soluciones mas claras. Yo marcaba la direccion de la app, el estilo que queria, lo que me parecia importante y lo que no, y la IA me ayudaba a traducir eso a una implementacion mas solida. En ese sentido, fue muy util para mantener una linea mas profesional sin perder lo que yo queria que fuera el proyecto.

Tambien me sirvio mucho para entender problemas tecnicos concretos. En lugar de quedarme bloqueado mucho tiempo con errores de configuracion, tipos, rutas o despliegue, pude avanzar mas rapido, entender por que pasaban las cosas y tomar mejores decisiones. Siento que fue una herramienta de apoyo real, no solo una forma de automatizar trabajo.

## Conclusion final

En general, este proyecto me dejo una sensacion muy buena porque no solo termine una app funcional, sino que tambien entendi mucho mejor como se construye un proyecto full stack de forma ordenada. Aprendi sobre React, TypeScript, Express, rutas, formularios, estado global, consumo de API, despliegue y documentacion, pero sobre todo aprendi a conectar todas esas partes entre si.

Si tuviera que resumir la experiencia, diria que fue un proyecto que empezo siendo algo relativamente simple y termino ayudandome a pensar de una manera mucho mas completa y profesional. Y en ese proceso, la IA fue una ayuda muy importante para mejorar la calidad del resultado final y adaptarlo a mi forma de pensar el proyecto.
