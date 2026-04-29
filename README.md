# Proyecto personal - Finanzas

App para gestionar finanzas personales: registrar movimientos, revisar resumenes y practicar una arquitectura full stack simple de bootcamp.

## Estructura del repo

- `frontend/`: Vite + React + TypeScript + Tailwind + React Router
- `server/`: Node.js + Express con arquitectura por capas
- `docs/`: documentacion del proyecto y del proceso

## Como correr el frontend

```bash
cd frontend
npm install
npm run dev
```

## Como correr el backend

```bash
cd server
npm install
npm run dev
```

El backend queda disponible en:

- `http://localhost:4000/api/v1`

## Variables de entorno del frontend

El frontend usa:

- `VITE_API_BASE_URL`

Ejemplo local:

```bash
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

Hay un ejemplo en:

- `frontend/.env.example`

## Despliegue en Vercel

Este repo esta preparado para desplegarse en Vercel como monorepo con dos proyectos:

- un proyecto para `server/`
- un proyecto para `frontend/`

URLs de produccion:

- Frontend: `https://proyecto-personal-hosd-pj4i9n6as-ignacios-projects-3a21675d.vercel.app/`
- API: `https://proyecto-personal-c7af3cly7-ignacios-projects-3a21675d.vercel.app/api/v1`

Pasos detallados:

- `docs/deployment.md`

## Documentacion

- componentes: `docs/components.md`
- hooks: `docs/hooks.md`
- context: `docs/context.md`
- rutas: `docs/routing.md`
- formularios: `docs/forms.md`
- api backend: `docs/api.md`
- api client: `docs/api-client.md`
- despliegue: `docs/deployment.md`
