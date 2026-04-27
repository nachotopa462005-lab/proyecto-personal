import type { HTMLAttributes, ReactNode } from 'react'

export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  actions?: ReactNode
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function SectionHeader({
  title,
  description,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cx(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
