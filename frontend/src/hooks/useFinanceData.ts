import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createTransaction as createTransactionRequest,
  deleteTransaction as deleteTransactionRequest,
  getTransactions,
} from '../api/transactions'
import type { Category, Transaction, TransactionDraft } from '../types/finance'

const seedCategories: Category[] = [
  { id: 'cat_food', name: 'Comida', type: 'expense', color: '#22c55e' },
  { id: 'cat_transport', name: 'Transporte', type: 'expense', color: '#60a5fa' },
  { id: 'cat_salary', name: 'Sueldo', type: 'income', color: '#a78bfa' },
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
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categoriesById = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>
  }, [categories])

  const loadTransactions = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getTransactions()
      setTransactions(response.items)
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : 'No se pudieron cargar los movimientos.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadTransactions()
  }, [loadTransactions])

  const createTransaction = useCallback(async (values: TransactionDraft) => {
    const response = await createTransactionRequest(values)
    setTransactions((prev) => [response.transaction, ...prev])
    return response.transaction
  }, [])

  const deleteTransaction = useCallback(async (transaction: Transaction) => {
    await deleteTransactionRequest(transaction.id)
    setTransactions((prev) => prev.filter((item) => item.id !== transaction.id))
  }, [])

  return {
    categories,
    categoriesById,
    transactions,
    loading,
    error,
    retry: loadTransactions,
    createTransaction,
    deleteTransaction,
  }
}
