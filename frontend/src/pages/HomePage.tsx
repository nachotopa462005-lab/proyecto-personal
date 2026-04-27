import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionList } from '../components/transactions/TransactionList'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { TransactionForm } from '../components/transactions/TransactionForm'
import { useAppUi } from '../context'
import { useLocalStorageState } from '../hooks'
import type { Category, Transaction, TransactionDraft } from '../types/finance'

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
    currency: 'EUR',
    categoryId: 'cat_food',
    date: '2026-04-23',
    note: 'Supermercado',
  },
  {
    id: 'txn_2',
    type: 'income',
    amountMinor: 120000000,
    currency: 'EUR',
    categoryId: 'cat_salary',
    date: '2026-04-01',
    note: 'Abril',
  },
]

function formatMoney(amountMinor: number, currency: 'EUR') {
  const amount = amountMinor / 100
  try {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export function HomePage() {
  const [categories] = useState<Category[]>(seedCategories)
  const [transactions, setTransactions] = useLocalStorageState<Transaction[]>(
    'finance-transactions',
    seedTransactions,
  )
  const {
    createModalOpen,
    transactionFilter,
    openCreateModal,
    closeCreateModal,
    setTransactionFilter,
  } = useAppUi()

  const categoriesById = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>
  }, [categories])

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === 'all') return transactions
    return transactions.filter((transaction) => transaction.type === transactionFilter)
  }, [transactions, transactionFilter])

  const totals = useMemo(() => {
    let income = 0
    let expense = 0

    for (const t of filteredTransactions) {
      if (t.type === 'income') income += t.amountMinor
      else expense += t.amountMinor
    }

    return { income, expense, balance: income - expense }
  }, [filteredTransactions])

  useEffect(() => {
    document.title = `Balance ${formatMoney(totals.balance, 'EUR')} | Finanzas personales`
  }, [totals.balance])

  const handleCreate = useCallback((values: TransactionDraft) => {
    const next: Transaction = {
      ...values,
      id: `txn_${Date.now()}`,
    }

    setTransactions((prev) => [next, ...prev])
    closeCreateModal()
  }, [closeCreateModal, setTransactions])

  const handleDelete = useCallback((transaction: Transaction) => {
    setTransactions((prev) => prev.filter((item) => item.id !== transaction.id))
  }, [setTransactions])

  const filterActions = (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={transactionFilter === 'all' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setTransactionFilter('all')}
      >
        Todos
      </Button>
      <Button
        variant={transactionFilter === 'income' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setTransactionFilter('income')}
      >
        Ingresos
      </Button>
      <Button
        variant={transactionFilter === 'expense' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setTransactionFilter('expense')}
      >
        Gastos
      </Button>
    </div>
  )

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Gestor de finanzas personales"
        description="Una vista simple y profesional para registrar ingresos, ordenar gastos y seguir el balance del mes."
        actions={<Button onClick={openCreateModal}>Nuevo movimiento</Button>}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          title="Ingresos"
          description="Total del periodo visible"
          value={formatMoney(totals.income, 'EUR')}
          tone="positive"
        />
        <StatCard
          title="Gastos"
          description="Total del periodo visible"
          value={formatMoney(totals.expense, 'EUR')}
          tone="negative"
        />
        <StatCard
          title="Balance"
          description="Ingresos menos gastos"
          value={formatMoney(totals.balance, 'EUR')}
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
            Movimientos
          </h2>
          {filterActions}
        </div>

        <div className="text-sm text-zinc-400">{filteredTransactions.length} items</div>

        <TransactionList
          items={filteredTransactions}
          categoriesById={categoriesById}
          onDelete={handleDelete}
          onCreate={openCreateModal}
        />
      </div>

      <Modal
        open={createModalOpen}
        title="Nuevo movimiento"
        description="Carga un gasto o un ingreso y guardalo con su categoria y fecha."
        onClose={closeCreateModal}
        footer={null}
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleCreate}
          onCancel={closeCreateModal}
        />
      </Modal>
    </section>
  )
}
