# Context API

Este documento resume la implementacion de estado global con Context API en el frontend.

## 1. Que se hizo

Se creo un contexto global para compartir estado de interfaz entre distintos componentes.

Archivo principal:

- `frontend/src/context/AppUiContext.tsx`

Se exportan:

- `AppUiProvider`
- `useAppUi`

## 2. Estado global compartido

El contexto guarda dos cosas:

- `createModalOpen`
  indica si el modal de crear movimiento esta abierto;
- `transactionFilter`
  guarda el filtro global de movimientos: `all`, `income` o `expense`.

Tambien expone funciones para modificar ese estado:

- `openCreateModal()`
- `closeCreateModal()`
- `setTransactionFilter(filter)`

## 3. Provider

El `Provider` envuelve toda la aplicacion en `main.tsx`.

Asi, cualquier componente hijo puede acceder al contexto sin necesidad de pasar props manualmente de un componente a otro.

Implementacion:

- `frontend/src/main.tsx`

## 4. Donde se consume

El contexto se usa en varios componentes:

### `HomePage`

- usa el estado del modal;
- usa el filtro global de movimientos;
- cambia el filtro desde los botones;
- abre y cierra el modal usando funciones del contexto.

### `Layout`

- lee `transactionFilter`;
- muestra el filtro actual en la cabecera.

Esto demuestra que el mismo estado puede ser compartido entre componentes distintos sin prop drilling.

## 5. Cuando conviene usar Context API

Context API es util cuando:

- varios componentes necesitan el mismo estado;
- ese estado esta en distintas partes del arbol de componentes;
- pasar props por muchas capas haria el codigo mas incomodo.

Ejemplos tipicos:

- tema visual;
- usuario autenticado;
- idioma;
- estado de sidebar o modales globales;
- filtros compartidos entre distintas vistas.

## 6. Cuando no hace falta

No conviene usar Context para todo.

Si el estado solo lo usa un componente o una pantalla, es mejor dejarlo con `useState` local.

En este proyecto:

- las categorias siguen como estado local;
- el formulario sigue manejando su propio estado local;
- solo lo que realmente se comparte se movio al contexto.

## 7. Resumen

La implementacion quedo simple y util para una app de bootcamp:

- `createContext` para crear el contexto;
- `AppUiProvider` para compartir el estado;
- `useAppUi` como hook auxiliar para consumirlo;
- uso real en `Layout` y `HomePage`.

Con esto, la app ya tiene una base clara de estado global para seguir creciendo.
