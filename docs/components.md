# Componentes (frontend)

Este documento describe los componentes reutilizables y de dominio creados para la app gestora de finanzas.

## Principios

- **Reutilizables**: no tienen reglas de negocio, solo UI y composición.
- **De dominio**: consumen datos tipados (transacciones, categorías) y exponen callbacks.
- **Estilo**: moderno/elegante, alto contraste, jerarquía clara, interacción simple.

## UI (reutilizables)

### `Button`

- **Archivo**: `frontend/src/components/ui/Button.tsx`
- **Props** (`ButtonProps`):
  - `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'`
  - `size?: 'sm' | 'md'`
  - `leftIcon?: ReactNode`, `rightIcon?: ReactNode`
  - + todas las props nativas de `<button>`
- **Uso**: acciones principales (“Nuevo movimiento”), cancelar, etc.

### `Card` (composición)

- **Archivo**: `frontend/src/components/ui/Card.tsx`
- **Componentes**:
  - `Card` (contenedor)
  - `CardHeader`, `CardTitle`, `CardDescription`, `CardBody`
- **Idea**: composición para armar tarjetas de Dashboard y tarjetas de items sin acoplar layout.

### `Field`, `Input`, `Select`, `Textarea`

- **Archivo**: `frontend/src/components/ui/Field.tsx`
- **Props**:
  - `Field`: `label`, `hint?`, `error?`, `children`
  - `Input/Select/Textarea`: props HTML nativas tipadas
- **Uso**: formularios con label + hint + error consistentes.

### `Modal` (composición)

- **Archivo**: `frontend/src/components/ui/Modal.tsx`
- **Props** (`ModalProps`):
  - `open: boolean`
  - `title?`, `description?`
  - `children`
  - `footer?`
  - `onClose()`
- **Uso**: crear/editar movimientos sin navegar a otra pantalla.

## Dominio (finanzas)

### Tipos

- **Archivo**: `frontend/src/types/finance.ts`
- **Tipos**:
  - `Category`, `Transaction`, `TransactionDraft`, `Money`

Regla: montos en `amountMinor` (centavos) para evitar floats.

### `TransactionCard`

- **Archivo**: `frontend/src/components/transactions/TransactionCard.tsx`
- **Props** (`TransactionCardProps`):
  - `transaction: Transaction`
  - `category?: Category`
  - `onEdit?(transaction)`, `onDelete?(transaction)`
- **Qué hace**:
  - Renderiza un movimiento con color de categoría.
  - Formatea el dinero (si puede) con `Intl.NumberFormat`.

### `TransactionList`

- **Archivo**: `frontend/src/components/transactions/TransactionList.tsx`
- **Props** (`TransactionListProps`):
  - `items: Transaction[]`
  - `categoriesById: Record<string, Category>`
  - `onEdit?`, `onDelete?`
- **Qué hace**:
  - Lista responsive (grid) de `TransactionCard`.
  - Empty state cuando no hay items.

### `TransactionForm`

- **Archivo**: `frontend/src/components/transactions/TransactionForm.tsx`
- **Props** (`TransactionFormProps`):
  - `categories: Category[]`
  - `initialValues?: Partial<TransactionDraft>`
  - `submitLabel?: string`
  - `onSubmit(values: TransactionDraft)`
  - `onCancel?()`
- **Qué hace**:
  - Form para alta/edición con validaciones simples.
  - Filtra categorías por tipo (gasto/ingreso).

## Dónde se usan

- **Home / Dashboard (demo actual)**: `frontend/src/pages/HomePage.tsx`
  - Usa `Card` para métricas.
  - Usa `Modal` + `TransactionForm` para crear.
  - Usa `TransactionList` para renderizar datos tipados.

