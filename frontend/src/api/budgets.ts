import type { BudgetResponse } from '../types/api'
import { apiFetch } from './client'

export function getBudget(month: string) {
  return apiFetch<BudgetResponse>(`/budgets?month=${month}`)
}

export function upsertBudget(month: string, amountMinor: number) {
  return apiFetch<BudgetResponse>(`/budgets/${month}`, {
    method: 'PUT',
    body: JSON.stringify({
      amountMinor,
      currency: 'EUR',
    }),
  })
}
