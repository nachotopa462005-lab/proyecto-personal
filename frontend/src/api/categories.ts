import type { CategoriesListResponse } from '../types/api'
import { apiFetch } from './client'

export function getCategories() {
  return apiFetch<CategoriesListResponse>('/categories')
}
