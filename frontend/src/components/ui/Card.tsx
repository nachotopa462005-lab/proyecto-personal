import type { HTMLAttributes, ReactNode } from 'react'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['flex items-start justify-between gap-3 px-5 pt-5', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={['text-base font-semibold tracking-tight text-zinc-50', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={['mt-1 text-sm text-zinc-300', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['px-5 pb-5 pt-4', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

