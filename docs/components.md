# Componentes del frontend

Este documento resume los componentes creados para el frontend de la app de finanzas.

La idea general es mantener una interfaz sencilla, profesional e intuitiva:

- componentes UI reutilizables para estructura y acciones;
- componentes de negocio para transacciones;
- props tipadas con TypeScript;
- estilos hechos con Tailwind CSS.

## 1. Componentes reutilizables

### `Button`

- Archivo: `frontend/src/components/ui/Button.tsx`
- Tipo de componente: reutilizable
- Props principales:
  - `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'`
  - `size?: 'sm' | 'md'`
  - `leftIcon?: ReactNode`
  - `rightIcon?: ReactNode`
- Uso:
  acciones principales, secundarias y de peligro.

### `Card`

- Archivo: `frontend/src/components/ui/Card.tsx`
- Tipo de componente: reutilizable
- Composicion:
  - `Card`
  - `CardHeader`
  - `CardTitle`
  - `CardDescription`
  - `CardBody`
- Uso:
  tarjetas para metricas, resumenes y contenido agrupado.

### `Field`, `Input`, `Select`, `Textarea`

- Archivo: `frontend/src/components/ui/Field.tsx`
- Tipo de componente: reutilizable
- Uso:
  formularios con labels, hints y mensajes de error consistentes.

### `Modal`

- Archivo: `frontend/src/components/ui/Modal.tsx`
- Tipo de componente: reutilizable
- Props principales:
  - `open`
  - `title`
  - `description`
  - `children`
  - `footer`
  - `onClose`
- Uso:
  mostrar formularios o contenido sin salir de la pantalla actual.

### `SectionHeader`

- Archivo: `frontend/src/components/ui/SectionHeader.tsx`
- Tipo de componente: reutilizable
- Props principales:
  - `title`
  - `description?`
  - `actions?`
- Uso:
  encabezados de pantalla o seccion con texto y acciones.

### `StatCard`

- Archivo: `frontend/src/components/ui/StatCard.tsx`
- Tipo de componente: reutilizable
- Props principales:
  - `title`
  - `description`
  - `value`
  - `tone?: 'neutral' | 'positive' | 'negative'`
- Uso:
  mostrar metricas del dashboard de forma clara.

### `EmptyState`

- Archivo: `frontend/src/components/ui/EmptyState.tsx`
- Tipo de componente: reutilizable
- Props principales:
  - `title`
  - `description`
  - `action?`
- Uso:
  estados vacios en listas o paginas.

## 2. Componentes de negocio

Estos componentes consumen datos tipados de finanzas.

### Tipos de dominio

- Archivo: `frontend/src/types/finance.ts`
- Tipos definidos:
  - `Money`
  - `Category`
  - `Transaction`
  - `TransactionDraft`
  - `TransactionType`

Decision importante:

- los montos se guardan en `amountMinor` para evitar errores con decimales.

### `TransactionCard`

- Archivo: `frontend/src/components/transactions/TransactionCard.tsx`
- Props principales:
  - `transaction: Transaction`
  - `category?: Category`
  - `onEdit?`
  - `onDelete?`
- Que hace:
  muestra una transaccion con categoria, fecha, nota e importe.

### `TransactionList`

- Archivo: `frontend/src/components/transactions/TransactionList.tsx`
- Props principales:
  - `items: Transaction[]`
  - `categoriesById: Record<string, Category>`
  - `onEdit?`
  - `onDelete?`
  - `onCreate?`
- Que hace:
  muestra una grilla de tarjetas de transacciones.
  Si no hay datos, usa `EmptyState`.

### `TransactionForm`

- Archivo: `frontend/src/components/transactions/TransactionForm.tsx`
- Props principales:
  - `categories: Category[]`
  - `initialValues?: Partial<TransactionDraft>`
  - `submitLabel?: string`
  - `onSubmit(values)`
  - `onCancel?()`
- Que hace:
  permite crear o editar movimientos con validaciones basicas.

## 3. Composicion de componentes

Se uso composicion en varios casos:

- `Card` se divide en partes para armar distintas tarjetas.
- `Modal` recibe `children` para mostrar formularios u otro contenido.
- `SectionHeader` permite pasar acciones como botones.
- `EmptyState` permite pasar una accion opcional.

Esto ayuda a reutilizar estructura sin repetir estilos.

## 4. Donde se usan

### `Layout`

- Archivo: `frontend/src/components/Layout.tsx`
- Responsabilidad:
  estructura general de la app, cabecera y contenedor principal.

### `HomePage`

- Archivo: `frontend/src/pages/HomePage.tsx`
- Responsabilidad:
  pantalla principal con:
  - encabezado;
  - metricas;
  - listado de movimientos;
  - modal con formulario.

### `NotFoundPage`

- Archivo: `frontend/src/pages/NotFoundPage.tsx`
- Responsabilidad:
  mostrar un estado vacio claro cuando una ruta no existe.

## 5. Resultado visual esperado

La interfaz busca verse:

- simple;
- ordenada;
- profesional;
- facil de entender para alguien que usa la app por primera vez.

Por eso se eligio:

- una paleta sobria;
- tarjetas claras para separar informacion;
- botones consistentes;
- formularios cortos y faciles de completar;
- componentes chicos y reutilizables.
