import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export type FieldProps = {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <label className="block space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-zinc-200">{label}</span>
        {hint ? <span className="text-xs text-zinc-400">{hint}</span> : null}
      </div>
      {children}
      {error ? <div className="text-xs text-red-300">{error}</div> : null}
    </label>
  )
}

const controlBase =
  'w-full rounded-lg border border-white/10 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100'
const controlFocus =
  'focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/15'
const controlPlaceholder = 'placeholder:text-zinc-500'

export type InputProps = InputHTMLAttributes<HTMLInputElement>
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cx(controlBase, controlFocus, controlPlaceholder, className)}
      {...props}
    />
  )
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>
export function Select({ className, ...props }: SelectProps) {
  return (
    <select className={cx(controlBase, controlFocus, className)} {...props} />
  )
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cx(controlBase, controlFocus, controlPlaceholder, className)}
      {...props}
    />
  )
}

