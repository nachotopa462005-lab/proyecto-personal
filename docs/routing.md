# Rutas y navegacion

Este documento resume la estructura de rutas del frontend.

## 1. Router usado

La app usa `React Router` para manejar la navegacion entre pantallas.

Archivo principal:

- `frontend/src/App.tsx`

La estructura general se monta con:

- `Routes`
- `Route`
- `Navigate`

## 2. Layout principal

Todas las paginas viven dentro de un layout comun:

- `frontend/src/components/Layout.tsx`

Este layout muestra:

- cabecera;
- navegacion principal;
- estado global del filtro actual;
- contenido de cada pagina con `Outlet`.

## 3. Estructura de rutas

Las rutas actuales son:

- `/`
  pagina de resumen o dashboard.

- `/transactions`
  pagina de movimientos.

- `/settings`
  pagina de ajustes.

- `/404`
  pagina de error para rutas no encontradas.

- `*`
  cualquier ruta desconocida redirige a `/404`.

## 4. Paginas creadas

### `HomePage`

- ruta: `/`
- archivo: `frontend/src/pages/HomePage.tsx`
- muestra:
  resumen del balance, ingresos y gastos.

### `TransactionsPage`

- ruta: `/transactions`
- archivo: `frontend/src/pages/TransactionsPage.tsx`
- muestra:
  listado de movimientos, filtros y modal para crear nuevos registros.

### `SettingsPage`

- ruta: `/settings`
- archivo: `frontend/src/pages/SettingsPage.tsx`
- muestra:
  informacion general de configuracion de la demo.

### `NotFoundPage`

- ruta: `/404`
- archivo: `frontend/src/pages/NotFoundPage.tsx`
- muestra:
  mensaje claro cuando una ruta no existe.

## 5. Navegacion entre paginas

La navegacion principal esta en el header del layout.

Se implementa con `NavLink` para marcar visualmente la pagina activa:

- `Resumen`
- `Movimientos`
- `Ajustes`

Ademas, desde el dashboard hay un acceso directo a la pagina de movimientos.

## 6. Resumen

La app ya tiene una navegacion basica pero completa para un proyecto de bootcamp:

- varias paginas;
- rutas separadas;
- menu de navegacion;
- pagina 404;
- layout compartido para mantener consistencia visual.
