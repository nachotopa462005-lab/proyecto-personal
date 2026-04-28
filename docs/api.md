# API del backend

Este documento resume los endpoints del backend de la app de finanzas.

Base URL:

- `http://localhost:4000/api/v1`

Tecnologia:

- Node.js
- Express
- arquitectura por capas: `routes`, `controllers`, `services` y validacion en la frontera

## 1. Healthcheck

### `GET /health`

Sirve para comprobar si el servidor esta levantado.

Respuesta `200`:

```json
{
  "status": "ok",
  "time": "2026-04-28T10:00:00.000Z"
}
```

## 2. Listar transacciones

### `GET /transactions`

Respuesta `200`:

```json
{
  "items": [
    {
      "id": "txn_1",
      "type": "expense",
      "amountMinor": 125000,
      "currency": "EUR",
      "categoryId": "cat_food",
      "date": "2026-04-23",
      "note": "Supermercado",
      "createdAt": "2026-04-23T10:00:00.000Z",
      "updatedAt": "2026-04-23T10:00:00.000Z"
    }
  ]
}
```

## 3. Obtener una transaccion

### `GET /transactions/:id`

Respuesta `200`:

```json
{
  "transaction": {
    "id": "txn_1",
    "type": "expense",
    "amountMinor": 125000,
    "currency": "EUR",
    "categoryId": "cat_food",
    "date": "2026-04-23",
    "note": "Supermercado",
    "createdAt": "2026-04-23T10:00:00.000Z",
    "updatedAt": "2026-04-23T10:00:00.000Z"
  }
}
```

Respuesta `404`:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Transaction not found"
  }
}
```

## 4. Crear una transaccion

### `POST /transactions`

Request:

```json
{
  "type": "expense",
  "amountMinor": 5400,
  "currency": "EUR",
  "categoryId": "cat_food",
  "date": "2026-04-28",
  "note": "Cafe y desayuno"
}
```

Respuesta `201`:

```json
{
  "transaction": {
    "id": "txn_1745830000000",
    "type": "expense",
    "amountMinor": 5400,
    "currency": "EUR",
    "categoryId": "cat_food",
    "date": "2026-04-28",
    "note": "Cafe y desayuno",
    "createdAt": "2026-04-28T10:00:00.000Z",
    "updatedAt": "2026-04-28T10:00:00.000Z"
  }
}
```

Respuesta `400`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "amountMinor must be a positive integer"
  }
}
```

## 5. Actualizar una transaccion

### `PATCH /transactions/:id`

Request:

```json
{
  "note": "Supermercado semanal",
  "amountMinor": 150000
}
```

Respuesta `200`:

```json
{
  "transaction": {
    "id": "txn_1",
    "type": "expense",
    "amountMinor": 150000,
    "currency": "EUR",
    "categoryId": "cat_food",
    "date": "2026-04-23",
    "note": "Supermercado semanal",
    "createdAt": "2026-04-23T10:00:00.000Z",
    "updatedAt": "2026-04-28T10:05:00.000Z"
  }
}
```

## 6. Eliminar una transaccion

### `DELETE /transactions/:id`

Respuesta `204` sin body.

Respuesta `404`:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Transaction not found"
  }
}
```

## 7. Estructura del backend

La carpeta `server/src/` quedo organizada asi:

- `routes/`
  define endpoints y conecta routers.
- `controllers/`
  recibe requests y devuelve responses HTTP.
- `services/`
  contiene la logica de negocio.
- `validators/`
  valida datos antes de entrar a la logica del negocio.
- `data/`
  guarda datos en memoria para esta fase.
