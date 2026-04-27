# Hooks de React

Este documento explica los hooks usados en el frontend de la app.

La idea fue usar hooks simples y utiles para una aplicacion de bootcamp:

- manejar estado local;
- reaccionar a cambios;
- optimizar calculos;
- reutilizar logica.

## 1. `useState`

Se usa para guardar estado local dentro de un componente.

En este proyecto se usa para:

- abrir y cerrar el modal de nuevo movimiento;
- guardar categorias de ejemplo en memoria;
- manejar el estado interno del formulario de transacciones.

Ejemplo:

- `createOpen` en `HomePage` indica si el modal esta abierto o cerrado.

## 2. `useEffect`

Se usa para ejecutar efectos secundarios cuando cambian ciertos valores.

En este proyecto se usa en dos lugares:

### En `HomePage`

- actualiza `document.title` cada vez que cambia el balance.

Esto hace que la pagina refleje el estado actual incluso fuera del contenido visible.

### En `useLocalStorageState`

- guarda automaticamente el valor en `localStorage` cuando cambia el estado.

Esto permite que los movimientos sigan estando despues de refrescar la pagina.

## 3. `useMemo`

Se usa para memorizar calculos y evitar recomputarlos en cada render si sus dependencias no cambiaron.

En este proyecto se usa para:

- crear `categoriesById` a partir del array de categorias;
- calcular `totals` a partir de las transacciones;
- filtrar categorias por tipo dentro de `TransactionForm`.

Esto ayuda a mantener el codigo claro y evita recalculos innecesarios.

## 4. `useCallback`

Se usa para memorizar funciones y reutilizar la misma referencia entre renders.

En este proyecto se usa en `HomePage` para:

- `handleOpenCreate`
- `handleCloseCreate`
- `handleCreate`
- `handleDelete`

Esto es util cuando esas funciones se pasan como props a otros componentes, porque ayuda a evitar renders innecesarios.

## 5. Custom hook: `useLocalStorageState`

Archivo:

- `frontend/src/hooks/useLocalStorageState.ts`

Funcion:

- combina `useState` y `useEffect` para guardar un estado en `localStorage`.

Como funciona:

1. al iniciar, intenta leer un valor guardado con una `key`;
2. si existe, lo usa como estado inicial;
3. si no existe, usa el valor inicial recibido;
4. cada vez que el estado cambia, lo vuelve a guardar en `localStorage`.

Uso en este proyecto:

- se usa para guardar las transacciones de la app.

Ventaja:

- la logica de persistencia queda reutilizable y separada del componente.

## 6. Resumen

Los hooks quedaron repartidos asi:

- `useState`: estado local de UI y formularios;
- `useEffect`: efectos secundarios y persistencia;
- `useMemo`: calculos derivados;
- `useCallback`: callbacks estables;
- `useLocalStorageState`: hook reutilizable para persistir estado.

Con esto, la app ya tiene una base de hooks clara, reutilizable y suficiente para seguir creciendo.
