import { useCallback, useMemo, useState } from 'react'
import type { Category, Transaction, TransactionDraft } from '../types/finance'
import { useLocalStorageState } from './useLocalStorageState'

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

export function formatMoney(amountMinor: number, currency: 'EUR' = 'EUR') {
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

export function useFinanceData() {
  const [categories] = useState<Category[]>(seedCategories)
  const [transactions, setTransactions] = useLocalStorageState<Transaction[]>(
    'finance-transactions',
    seedTransactions,
  )

  const categoriesById = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>
  }, [categories])

  const createTransaction = useCallback((values: TransactionDraft) => {
    const next: Transaction = {
      ...values,
      id: `txn_${Date.now()}`,
    }

    setTransactions((prev) => [next, ...prev])
  }, [setTransactions])

  const deleteTransaction = useCallback((transaction: Transaction) => {
    setTransactions((prev) => prev.filter((item) => item.id !== transaction.id))
  }, [setTransactions])

  return {
    categories,
    categoriesById,
    transactions,
    createTransaction,
    deleteTransaction,
  }
}
