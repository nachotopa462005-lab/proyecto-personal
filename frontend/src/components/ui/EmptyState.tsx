import type { HTMLAttributes, ReactNode } from 'react'

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
  action?: ReactNode
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        'rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 text-center',
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-md space-y-2">
        <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
        <p className="text-sm leading-6 text-zinc-400">{description}</p>
      </div>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}
