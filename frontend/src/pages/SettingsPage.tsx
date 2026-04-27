import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/SectionHeader'

export function SettingsPage() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Ajustes"
        description="Espacio simple para mostrar preferencias generales de la aplicacion."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Moneda</CardTitle>
              <CardDescription>Configuracion actual de la aplicacion</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 text-sm text-zinc-300">
            <p>La aplicacion trabaja solo con euros por ahora.</p>
            <p className="text-zinc-400">Codigo de moneda activo: EUR.</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Persistencia local</CardTitle>
              <CardDescription>Comportamiento de la demo</CardDescription>
            </div>
          </CardHeader>
          <CardBody className="space-y-2 text-sm text-zinc-300">
            <p>Los movimientos se guardan en el navegador usando localStorage.</p>
            <p className="text-zinc-400">
              Esto permite probar la app sin backend real.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
