type ValidationError = {
  status: 400
  body: {
    error: {
      code: 'VALIDATION_ERROR'
      message: string
    }
  }
}

type ValidationSuccess<T> = {
  status: 200
  value: T
}

export type ValidationResult<T> = ValidationError | ValidationSuccess<T>

export function badRequest(message: string): ValidationError {
  return {
    status: 400,
    body: {
      error: {
        code: 'VALIDATION_ERROR',
        message,
      },
    },
  }
}

export function isValidDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function isValidMonth(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)
}
