import app from './app.js'
import { config } from './config/index.js'

export default app

if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
  })
}
