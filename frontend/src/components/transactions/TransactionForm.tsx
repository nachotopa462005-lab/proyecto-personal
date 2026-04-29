import { useMemo, useState } from 'react'
import type { Category, TransactionDraft, TransactionType } from '../../types/finance'
import { Button } from '../ui/Button'
import { Field, Input, Select, Textarea } from '../ui/Field'

export type TransactionFormValues = TransactionDraft

export type TransactionFormProps = {
  categories: Category[]
  initialValues?: Partial<TransactionFormValues>
  submitLabel?: string
  onSubmit: (values: TransactionFormValues) => void
  onCancel?: () => void
}

function parseAmountToMinorUnits(rawValue: string) {
  const sanitized = rawValue.trim().replace(/\s/g, '')

  if (!sanitized) return null

  const lastComma = sanitized.lastIndexOf(',')
  const lastDot = sanitized.lastIndexOf('.')
  const decimalIndex = Math.max(lastComma, lastDot)

  if (decimalIndex === -1) {
    const integerOnly = sanitized.replace(/[^\d]/g, '')
    if (!integerOnly) return null
    return Number(integerOnly) * 100
  }

  const integerPart = sanitized.slice(0, decimalIndex).replace(/[^\d]/g, '')
  const decimalPart = sanitized.slice(decimalIndex + 1).replace(/[^\d]/g, '')

  if (!integerPart && !decimalPart) return null

  const normalizedInteger = integerPart || '0'
  const normalizedDecimals = `${decimalPart}00`.slice(0, 2)

  return Number(normalizedInteger) * 100 + Number(normalizedDecimals)
}

export function TransactionForm({
  categories,
  initialValues,
  submitLabel = 'Guardar',
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const defaultType = initialValues?.type ?? ''
  const defaultCurrency = initialValues?.currency ?? 'EUR'

  const [type, setType] = useState<TransactionType | ''>(defaultType)
  const [amountInput, setAmountInput] = useState<string>(() => {
    if (typeof initialValues?.amountMinor !== 'number') return ''
    return (initialValues.amountMinor / 100).toFixed(2).replace('.', ',')
  })
  const [categoryId, setCategoryId] = useState<string>(initialValues?.categoryId ?? '')
  const [date, setDate] = useState<string>(initialValues?.date ?? '')
  const [note, setNote] = useState<string>(initialValues?.note ?? '')
  const [error, setError] = useState<string | null>(null)

  const categoriesForType = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const amountMinor = parseAmountToMinorUnits(amountInput)

    if (!type) return setError('Elige si el movimiento es gasto o ingreso.')
    if (!categoryId) return setError('Elige una categoria.')
    if (amountMinor === null || !Number.isInteger(amountMinor) || amountMinor <= 0) {
      return setError('Escribe un importe valido. Puedes usar coma o punto decimal.')
    }
    if (!date) return setError('Elige una fecha.')

    onSubmit({
      type,
      amountMinor,
      currency: defaultCurrency,
      categoryId,
      date,
      note: note.trim() ? note.trim() : undefined,
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Tipo">
          <Select
            value={type}
            onChange={(e) => {
              const next = e.target.value as TransactionType | ''
              setType(next)
              setCategoryId('')
            }}
          >
            <option value="">Selecciona una opcion</option>
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </Select>
        </Field>

        <Field label="Categoria">
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Selecciona una categoria</option>
            {categoriesForType.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Importe" hint="Ej: 12,50 o 1.250,75">
          <Input
            inputMode="decimal"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="0,00"
          />
        </Field>

        <Field label="Fecha">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
      </div>

      <Field label="Nota (opcional)">
        <Textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ej: supermercado, cafe, taxi..."
        />
      </Field>

      {error ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
