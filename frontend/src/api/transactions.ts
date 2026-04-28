import type {
  TransactionResponse,
  TransactionsListResponse,
} from '../types/api'
import type { TransactionDraft } from '../types/finance'
import { apiFetch } from './client'

export function getTransactions() {
  return apiFetch<TransactionsListResponse>('/transactions')
}

export function createTransaction(values: TransactionDraft) {
  return apiFetch<TransactionResponse>('/transactions', {
    method: 'POST',
    body: JSON.stringify(values),
  })
}

export function deleteTransaction(id: string) {
  return apiFetch<void>(`/transactions/${id}`, {
    method: 'DELETE',
  })
}
