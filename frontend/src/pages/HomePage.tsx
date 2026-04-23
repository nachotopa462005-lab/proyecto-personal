import { useMemo, useState } from 'react'
import type { Category, Transaction, TransactionDraft } from '../types/finance'
import { TransactionList } from '../components/transactions/TransactionList'
import { Button } from '../components/ui/Button'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { TransactionForm } from '../components/transactions/TransactionForm'

const seedCategories: Category[] = [
  { id: 'cat_food', name: 'Comida', type: 'expense', color: '#22c55e' },
  { id: 'cat_transport', name: 'Transporte', type: 'expense', color: '#60a5fa' },
  { id: 'cat_salary', name: 'Sueldo', type: 'income', color: '#a78bfa' },
]

const seedTransactions: Transaction[] = [
  {
    id: 'txn_1',
    type: 'expense',
    amountMinor: 125000,
    currency: 'ARS',
    categoryId: 'cat_food',
    date: '2026-04-23',
    note: 'Supermercado',
  },
  {
    id: 'txn_2',
    type: 'income',
    amountMinor: 120000000,
    currency: 'ARS',
    categoryId: 'cat_salary',
    date: '2026-04-01',
    note: 'Abril',
  },
]

export function HomePage() {
  const [categories] = useState<Category[]>(seedCategories)
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions)
  const [createOpen, setCreateOpen] = useState(false)

  const categoriesById = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>
  }, [categories])

  const totals = useMemo(() => {
    let income = 0
    let expense = 0
    for (const t of transactions) {
      if (t.type === 'income') income += t.amountMinor
      else expense += t.amountMinor
    }
    return { income, expense, balance: income - expense }
  }, [transactions])

  function handleCreate(values: TransactionDraft) {
    const next: Transaction = {
      ...values,
      id: `txn_${Date.now()}`,
    }
    setTransactions((prev) => [next, ...prev])
    setCreateOpen(false)
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Gestor de finanzas personales
          </h1>
          <p className="max-w-prose text-zinc-300">
            Interfaz moderna y simple: movimientos claros, categorías visibles y
            métricas del mes.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Nuevo movimiento</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Ingresos</CardTitle>
              <CardDescription>Total del período</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <div className="text-2xl font-semibold tabular-nums text-emerald-200">
              ${(totals.income / 100).toFixed(2)}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Gastos</CardTitle>
              <CardDescription>Total del período</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <div className="text-2xl font-semibold tabular-nums text-red-200">
              ${(totals.expense / 100).toFixed(2)}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Ingresos - gastos</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <div className="text-2xl font-semibold tabular-nums text-zinc-50">
              ${(totals.balance / 100).toFixed(2)}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Movimientos</h2>
          <div className="text-sm text-zinc-400">
            {transactions.length} items
          </div>
        </div>
        <TransactionList items={transactions} categoriesById={categoriesById} />
      </div>

      <Modal
        open={createOpen}
        title="Nuevo movimiento"
        description="Cargá un gasto o ingreso. El monto se ingresa en centavos para evitar errores de redondeo."
        onClose={() => setCreateOpen(false)}
        footer={null}
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
        />
      </Modal>
    </section>
  )
}

