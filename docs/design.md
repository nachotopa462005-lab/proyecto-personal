# Diseño y arquitectura

Este documento define la arquitectura inicial de la app de finanzas: estructura de componentes, gestión de estado, diseño de API y decisiones de persistencia.

## Objetivo del sistema

Permitir que una persona registre ingresos y gastos, los categorice, visualice estadísticas por período y gestione un presupuesto mensual con alertas.

## Arquitectura general

- **Frontend**: SPA con React + TypeScript + React Router + Tailwind.
- **API**: REST versionada bajo `/api/v1`.
- **Backend**: capa HTTP (routes/controllers) + lógica (services) + persistencia (DB) + config.

## Frontend

### Estructura de páginas (rutas)

Rutas sugeridas (pueden crecer):

- `/` → **Dashboard**: resumen del mes, balance, gráficos principales.
- `/transactions` → **Movimientos**: listado, filtros, alta/edición/baja.
- `/categories` → **Categorías**: ABM de categorías.
- `/budgets` → **Presupuestos**: presupuesto mensual (por total y opcionalmente por categoría).
- `/settings` → **Configuración**: preferencias UI, moneda, etc.
- `/auth/login` / `/auth/register` → **Autenticación** (si aplica).

### Componentes principales (no reutilizables, “de feature”)

Estos suelen vivir cerca de la feature (por ahora en `src/components/` o `src/pages/` y luego mover a `src/features/...` si crece):

- **Transactions**
  - `TransactionList`
  - `TransactionFilters`
  - `TransactionForm`
  - `TransactionRow`
- **Categories**
  - `CategoryList`
  - `CategoryForm`
- **Budgets**
  - `BudgetSummary`
  - `BudgetForm`
- **Dashboard**
  - `MonthSummary`
  - `SpendingByCategoryChart`
  - `BalanceTrendChart`

### Componentes reutilizables (“UI primitives”)

Reutilizables, sin reglas de negocio; se recomiendan en `src/components/ui/` (podés crearlo cuando empieces a usarlos):

- **Layout**: `AppShell`, `PageHeader`, `Sidebar`/`TopNav`
- **Inputs**: `Button`, `Input`, `Select`, `Textarea`, `DatePicker` (cuando se elija lib)
- **Feedback**: `Toast`, `Alert`, `EmptyState`, `LoadingSpinner`, `Skeleton`
- **Data display**: `Card`, `Table`, `Tag/Badge`, `Stat`
- **Overlays**: `Modal`, `DialogConfirm`, `Drawer`

Regla: si un componente **no** conoce “transactions/budgets/etc.” y solo recibe props genéricas → es reutilizable.

### Gestión de estado

Separación recomendada:

- **Server state (datos de API)**:
  - Se mantiene como fuente de verdad en el backend.
  - En el frontend se consume con un “data layer” (ideal: TanStack React Query).
  - Cache, invalidaciones y loading/error se resuelven en ese layer.

- **Client/UI state (solo interfaz)**:
  - Estado de filtros, modales, tabs, selección de filas, paginación local.
  - Preferencia de tema, moneda mostrada, densidad de tabla, etc.
  - Implementación: `useState` local + (si se comparte entre pantallas) `React Context + useReducer`.

Persistencia local recomendada:

- `localStorage`: preferencias UI (tema), últimos filtros, última fecha seleccionada.
- **No** persistir en cliente datos críticos (movimientos) si existe backend; usar cache (y opcionalmente “offline draft”).

### Estructura de carpetas (frontend)

La estructura actual existe y se mantiene:

- `src/pages/`: pantallas (route components).
- `src/components/`: layout y componentes de UI/feature.
- `src/hooks/`: hooks reutilizables (`useDebounce`, `useLocalStorage`, etc.).
- `src/types/`: tipos de dominio y de API.
- `src/utils/`: helpers (fechas, moneda, parsing).
- `src/context/`: context/reducers para estado UI compartido.
- `src/api/`: cliente HTTP y funciones por recurso (ej. `transactionsApi.ts`).

Si el proyecto crece: mover a `src/features/{transactions,categories,...}/...` manteniendo `ui/` para primitives.

## Backend / API REST

### Convenciones

- **Base**: `/api/v1`
- **Formato**: JSON
- **Auth**: Bearer token (JWT) en `Authorization: Bearer <token>` (si se implementa multiusuario).
- **Errores**: siempre JSON con `error.code` y `error.message`.
- **Fechas**: ISO 8601 (UTC) en strings (`2026-04-23T13:00:00.000Z`)
- **Dinero**:
  - Guardar en entero menor unidad (ej. centavos) para evitar floats: `amountMinor: number`.
  - Exponer además `currency` (ISO 4217).

### Recursos principales

#### Health

- `GET /api/v1/health`
  - **200**

```json
{ "status": "ok", "time": "2026-04-23T13:00:00.000Z" }
```

#### Auth (si aplica)

- `POST /api/v1/auth/register`
  - Body: `{ "email": string, "password": string, "name"?: string }`
  - **201** → `{ "user": User, "token": string }`

- `POST /api/v1/auth/login`
  - Body: `{ "email": string, "password": string }`
  - **200** → `{ "user": User, "token": string }`

#### Users

- `GET /api/v1/me` (auth)
  - **200** → `{ "user": User }`

`User`:

```json
{
  "id": "usr_123",
  "email": "a@b.com",
  "name": "Nacho",
  "createdAt": "2026-04-23T13:00:00.000Z"
}
```

#### Categories

- `GET /api/v1/categories`
  - **200** → `{ "items": Category[] }`
- `POST /api/v1/categories`
  - Body: `{ "name": string, "type": "expense" | "income", "color"?: string }`
  - **201** → `{ "category": Category }`
- `PATCH /api/v1/categories/:id`
  - Body parcial
  - **200** → `{ "category": Category }`
- `DELETE /api/v1/categories/:id`
  - **204**

`Category`:

```json
{
  "id": "cat_123",
  "name": "Comida",
  "type": "expense",
  "color": "#22c55e",
  "createdAt": "2026-04-23T13:00:00.000Z",
  "updatedAt": "2026-04-23T13:00:00.000Z"
}
```

#### Transactions (movimientos)

- `GET /api/v1/transactions?from=YYYY-MM-DD&to=YYYY-MM-DD&type=expense|income&categoryId=cat_...&q=...&limit=50&cursor=...`
  - **200** → `{ "items": Transaction[], "nextCursor": string | null }`
- `POST /api/v1/transactions`
  - Body: `{ "type": "expense" | "income", "amountMinor": number, "currency": "ARS", "categoryId": string, "date": "YYYY-MM-DD", "note"?: string }`
  - **201** → `{ "transaction": Transaction }`
- `PATCH /api/v1/transactions/:id`
  - Body parcial
  - **200** → `{ "transaction": Transaction }`
- `DELETE /api/v1/transactions/:id`
  - **204**

`Transaction`:

```json
{
  "id": "txn_123",
  "type": "expense",
  "amountMinor": 125000,
  "currency": "ARS",
  "categoryId": "cat_123",
  "date": "2026-04-23",
  "note": "Supermercado",
  "createdAt": "2026-04-23T13:00:00.000Z",
  "updatedAt": "2026-04-23T13:00:00.000Z"
}
```

#### Budgets (presupuesto mensual)

- `GET /api/v1/budgets?month=YYYY-MM`
  - **200** → `{ "budget": Budget | null }`
- `PUT /api/v1/budgets/:month` (idempotente)
  - Body: `{ "totalAmountMinor": number, "currency": "ARS", "byCategory"?: { "categoryId": string, "amountMinor": number }[] }`
  - **200** → `{ "budget": Budget }`

`Budget`:

```json
{
  "month": "2026-04",
  "totalAmountMinor": 800000,
  "currency": "ARS",
  "byCategory": [{ "categoryId": "cat_123", "amountMinor": 200000 }],
  "createdAt": "2026-04-23T13:00:00.000Z",
  "updatedAt": "2026-04-23T13:00:00.000Z"
}
```

#### Reports (para dashboard)

- `GET /api/v1/reports/summary?month=YYYY-MM`
  - **200** → `{ "summary": MonthSummary }`

`MonthSummary` (ejemplo):

```json
{
  "month": "2026-04",
  "incomeTotalMinor": 1200000,
  "expenseTotalMinor": 650000,
  "balanceMinor": 550000,
  "spendingByCategory": [
    { "categoryId": "cat_123", "amountMinor": 125000 }
  ]
}
```

### Respuestas de error (contrato)

Ejemplo de error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "amountMinor must be a positive integer",
    "details": { "field": "amountMinor" }
  }
}
```

## Persistencia: servidor vs cliente

### Se persiste en el servidor (fuente de verdad)

- Usuarios (si hay cuentas)
- Categorías
- Movimientos (income/expense)
- Presupuestos mensuales
- Agregados/materializados opcionales para reportes (o se calculan on-demand)

### Solo en el cliente (UI/experiencia)

- Tema (claro/oscuro), preferencias de UI
- Filtros y estado de navegación (último mes seleccionado, búsqueda)
- Drafts locales no confirmados (ej. formulario abierto)
- Cache de requests (si se usa React Query, se considera “derivado”)

## Diagrama simple del flujo de datos

```mermaid
flowchart LR
  U[Usuario] -->|interacción| UI[React UI / Pages]
  UI -->|acciones| CS[Client State\n(filtros, modales, prefs)]
  UI -->|fetch/mutate| DL[Data Layer\n(api client + cache)]
  DL -->|HTTP JSON| API[REST API\n/api/v1]
  API -->|routes/controllers| SVC[Services\nreglas de negocio]
  SVC -->|persistencia| DB[(Base de datos)]
  DB --> SVC --> API --> DL --> UI
```

## Decisiones abiertas (para definir más adelante)

- **Autenticación**: single-user local vs multi-user con JWT.
- **DB**: SQLite/Postgres y ORM (Prisma/Drizzle/etc.).
- **Reportes**: on-demand vs materializados.
- **Offline**: si se soportan operaciones sin conexión.

