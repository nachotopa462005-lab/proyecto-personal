import type { Budget, Category, Transaction } from './finance'

export type ApiError = {
  error: {
    code: string
    message: string
  }
}

export type HealthResponse = {
  status: 'ok'
  time: string
}

export type TransactionsListResponse = {
  items: Transaction[]
}

export type TransactionResponse = {
  transaction: Transaction
}

export type CategoriesListResponse = {
  items: Category[]
}

export type BudgetResponse = {
  budget: Budget | null
}
