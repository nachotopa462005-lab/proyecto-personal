import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="text-zinc-300">
        La ruta que intentaste abrir no existe.
      </p>
      <Link className="inline-flex rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

