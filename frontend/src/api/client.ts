import type { ApiError } from '../types/api'

const API_BASE_URL = 'http://localhost:4000/api/v1'

export class ApiClientError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!res.ok) {
    let message = `Request failed: ${res.status}`

    try {
      const data = (await res.json()) as ApiError
      message = data.error.message
    } catch {
      // Ignore JSON parse errors for non-JSON failures.
    }

    throw new ApiClientError(message, res.status)
  }

  if (res.status === 204) {
    return undefined as T
  }

  return (await res.json()) as T
}
