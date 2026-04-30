import cors from 'cors'
import express from 'express'
import { apiRouter } from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', apiRouter)

app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  })
})

app.use((
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  console.error(error)

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unexpected server error',
    },
  })
})

export default app
