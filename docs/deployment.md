# Despliegue en Vercel

Este proyecto esta preparado para desplegarse en Vercel usando el mismo repositorio con dos proyectos separados:

- `server/` para la API
- `frontend/` para la app React

## 1. Idea general

En Vercel, este repo conviene desplegarlo como monorepo:

- un proyecto con root directory `server`
- otro proyecto con root directory `frontend`

Asi el backend y el frontend quedan independientes, pero salen del mismo repositorio.

## 2. Desplegar el backend

1. Entra a Vercel Dashboard.
2. Pulsa `Add New` -> `Project`.
3. Importa este repositorio.
4. En `Root Directory`, elige `server`.
5. Deja que Vercel detecte el proyecto.
6. Pulsa `Deploy`.

Cuando termine, copia la URL del backend.

Ejemplo:

- `https://tu-backend.vercel.app`

Tu API real quedara en:

- `https://tu-backend.vercel.app/api/v1`

## 3. Desplegar el frontend

1. Crea otro proyecto nuevo en Vercel.
2. Vuelve a importar el mismo repositorio.
3. En `Root Directory`, elige `frontend`.
4. Antes de desplegar, crea esta variable de entorno:

`VITE_API_BASE_URL=https://tu-backend.vercel.app/api/v1`

5. Pulsa `Deploy`.

## 4. React Router en produccion

El frontend ya incluye:

- `frontend/vercel.json`

Ese archivo reescribe las rutas a `index.html` para que React Router funcione bien al refrescar o entrar directamente a una URL como `/transactions`.

## 5. Comprobar que funciona

Despues del despliegue, revisa esto:

### Backend

- abre `https://tu-backend.vercel.app/api/v1/health`
- deberia devolver un JSON con `status: "ok"`

URL desplegada en este proyecto:

- `https://proyecto-personal-c7af3cly7-ignacios-projects-3a21675d.vercel.app/api/v1`

### Frontend

- abre la URL del frontend
- comprueba que carga la app
- entra a `Movimientos`
- crea un movimiento
- revisa que aparezca en la lista
- vuelve al resumen y comprueba que cambian los datos
- define un presupuesto mensual y revisa que se descuente al crear gastos

URL desplegada en este proyecto:

- `https://proyecto-personal-hosd-pj4i9n6as-ignacios-projects-3a21675d.vercel.app/`

## 6. Si cambias la URL del backend

Si el backend cambia de dominio:

1. entra al proyecto del frontend en Vercel
2. ve a `Settings` -> `Environment Variables`
3. actualiza `VITE_API_BASE_URL`
4. haz un redeploy del frontend

Valor actual esperado para el frontend:

`VITE_API_BASE_URL=https://proyecto-personal-c7af3cly7-ignacios-projects-3a21675d.vercel.app/api/v1`

## 7. Archivos relevantes para el despliegue

- `frontend/src/api/client.ts`
- `frontend/.env.example`
- `frontend/vercel.json`
- `server/package.json`
- `server/src/index.ts`
- `server/src/app.ts`

## 8. Nota importante

Desde este entorno no puedo terminar el despliegue yo directamente porque hace falta acceso a tu cuenta de Vercel y a su panel o CLI autenticada.

Pero el repo ya queda preparado para hacerlo con esos pasos.
