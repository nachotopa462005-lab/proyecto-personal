import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'

export function NotFoundPage() {
  return (
    <section>
      <EmptyState
        title="Pagina no encontrada"
        description="La ruta que intentaste abrir no existe o ya no esta disponible."
        action={
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/15"
          >
            Volver al inicio
          </Link>
        }
      />
    </section>
  )
}
