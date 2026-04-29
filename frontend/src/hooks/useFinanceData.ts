import { useCallback, useEffect, useMemo, useState } from 'react'
import { upsertBudget as upsertBudgetRequest, getBudget } from '../api/budgets'
import { getCategories } from '../api/categories'
import {
  createTransaction as createTransactionRequest,
  deleteTransaction as deleteTransactionRequest,
  getTransactions,
} from '../api/transactions'
import type { Budget, Category, Transaction, TransactionDraft } from '../types/finance'

function getCurrentMonth() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${now.getFullYear()}-${month}`
}

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
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budget, setBudget] = useState<Budget | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const currentMonth = useMemo(() => getCurrentMonth(), [])

  const categoriesById = useMemo(() => {
    return Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>
  }, [categories])

  const loadFinanceData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [transactionsResponse, categoriesResponse, budgetResponse] = await Promise.all([
        getTransactions(),
        getCategories(),
        getBudget(currentMonth),
      ])

      setTransactions(transactionsResponse.items)
      setCategories(categoriesResponse.items)
      setBudget(budgetResponse.budget)
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : 'No se pudieron cargar los datos.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [currentMonth])

  useEffect(() => {
    void loadFinanceData()
  }, [loadFinanceData])

  const createTransaction = useCallback(async (values: TransactionDraft) => {
    const response = await createTransactionRequest(values)
    setTransactions((prev) => [response.transaction, ...prev])
    return response.transaction
  }, [])

  const deleteTransaction = useCallback(async (transaction: Transaction) => {
    await deleteTransactionRequest(transaction.id)
    setTransactions((prev) => prev.filter((item) => item.id !== transaction.id))
  }, [])

  const saveBudget = useCallback(async (amountMinor: number) => {
    const response = await upsertBudgetRequest(currentMonth, amountMinor)
    setBudget(response.budget)
    return response.budget
  }, [currentMonth])

  return {
    categories,
    categoriesById,
    transactions,
    budget,
    currentMonth,
    loading,
    error,
    retry: loadFinanceData,
    createTransaction,
    deleteTransaction,
    saveBudget,
  }
}
