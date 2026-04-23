import type { ReactNode } from 'react'

export type ModalProps = {
  open: boolean
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
}

export function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
}: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
          {(title || description) && (
            <div className="border-b border-zinc-800 px-5 py-4">
              {title ? (
                <h2 className="text-base font-semibold tracking-tight text-zinc-50">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-1 text-sm text-zinc-300">{description}</p>
              ) : null}
            </div>
          )}

          <div className="px-5 py-4">{children}</div>

          {footer ? (
            <div className="border-t border-zinc-800 px-5 py-4">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

