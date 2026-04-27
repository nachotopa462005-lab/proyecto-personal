import type { ReactNode } from 'react'
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from './Card'

export type StatCardProps = {
  title: string
  description: string
  value: string
  tone?: 'neutral' | 'positive' | 'negative'
  aside?: ReactNode
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  neutral: 'text-zinc-50',
  positive: 'text-emerald-300',
  negative: 'text-rose-300',
}

export function StatCard({
  title,
  description,
  value,
  tone = 'neutral',
  aside,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {aside}
      </CardHeader>
      <CardBody className="pt-2">
        <div className={['text-2xl font-semibold tabular-nums', toneClasses[tone]].join(' ')}>
          {value}
        </div>
      </CardBody>
    </Card>
  )
}
