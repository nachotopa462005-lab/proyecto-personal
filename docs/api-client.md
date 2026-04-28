# Capa de red del frontend

Este documento resume como el frontend consume la API del backend y como se tipan sus respuestas.

## 1. Cliente base

Archivo:

- `frontend/src/api/client.ts`

Responsabilidad:

- centralizar llamadas HTTP con `fetch`;
- usar una base URL comun;
- devolver respuestas tipadas con TypeScript;
- transformar errores HTTP en mensajes reutilizables para la UI.

Base URL actual:

- `http://localhost:4000/api/v1`

## 2. Cliente de transacciones

Archivo:

- `frontend/src/api/transactions.ts`

Funciones implementadas:

- `getTransactions()`
- `createTransaction(values)`
- `deleteTransaction(id)`

Estas funciones usan el cliente base y devuelven datos tipados.

## 3. Tipos del contrato

Archivos:

- `frontend/src/types/finance.ts`
- `frontend/src/types/api.ts`

Tipos principales:

- `Transaction`
- `TransactionDraft`
- `ApiError`
- `TransactionsListResponse`
- `TransactionResponse`
- `HealthResponse`

Ejemplo de `Transaction`:

```ts
type Transaction = {
  id: string
  type: 'expense' | 'income'
  amountMinor: number
  currency: 'EUR'
  categoryId: string
  date: string
  note?: string
  createdAt: string
  updatedAt: string
}
```

## 4. Hook de datos

Archivo:

- `frontend/src/hooks/useFinanceData.ts`

Este hook usa la API como fuente de verdad para las transacciones.

Responsabilidades:

- cargar movimientos desde el backend;
- crear movimientos usando `POST`;
- eliminar movimientos usando `DELETE`;
- exponer estados de red a la UI.

Valores que devuelve:

- `transactions`
- `loading`
- `error`
- `retry`
- `createTransaction`
- `deleteTransaction`
- `categories`
- `categoriesById`

## 5. Estados de red en la UI

La interfaz ya maneja los tres estados pedidos:

### Loading

- en `HomePage` se muestran metricas con texto de carga;
- en `TransactionsPage` se muestra un bloque de carga mientras llegan los datos.

### Success

- cuando la API responde bien, se renderizan resumenes y listas con los datos recibidos.

### Error

- si la API falla, se muestra un `EmptyState` con el mensaje de error;
- tambien se ofrece un boton `Reintentar`.

## 6. Fuente de verdad

Antes, las transacciones vivian en `localStorage`.

Ahora:

- las transacciones se obtienen desde el backend;
- las altas y bajas se hacen contra la API;
- la UI actualiza su estado a partir de la respuesta del servidor.

Decision:

- `localStorage` ya no es la fuente de verdad para datos que pertenecen al backend.

## 7. Resumen

La capa de red del frontend quedo resuelta con una estructura simple:

- cliente base tipado;
- modulo API por recurso;
- tipos alineados con el backend;
- hook de datos reutilizable;
- manejo de `loading`, `success` y `error` en la UI.
