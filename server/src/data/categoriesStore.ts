import type { TransactionType } from './transactionsStore.js'
import { readJsonFile, writeJsonFile } from '../utils/fileStore.js'

export type CategoryRecord = {
  id: string
  name: string
  type: TransactionType
  color: string
}

const DEFAULT_CATEGORIES: CategoryRecord[] = [
  { id: 'cat_salary', name: 'Sueldo', type: 'income', color: '#22c55e' },
  { id: 'cat_freelance', name: 'Freelance', type: 'income', color: '#16a34a' },
  { id: 'cat_other_income', name: 'Otros ingresos', type: 'income', color: '#15803d' },
  { id: 'cat_food', name: 'Comida', type: 'expense', color: '#f97316' },
  { id: 'cat_transport', name: 'Transporte', type: 'expense', color: '#3b82f6' },
  { id: 'cat_rent', name: 'Alquiler', type: 'expense', color: '#a855f7' },
  { id: 'cat_bills', name: 'Facturas', type: 'expense', color: '#06b6d4' },
  { id: 'cat_health', name: 'Salud', type: 'expense', color: '#ef4444' },
  { id: 'cat_leisure', name: 'Ocio', type: 'expense', color: '#eab308' },
  { id: 'cat_shopping', name: 'Compras', type: 'expense', color: '#ec4899' },
  { id: 'cat_education', name: 'Educacion', type: 'expense', color: '#14b8a6' },
  { id: 'cat_other', name: 'Otros', type: 'expense', color: '#71717a' },
]

export const categoriesStore: CategoryRecord[] = readJsonFile('categories.json', DEFAULT_CATEGORIES)
