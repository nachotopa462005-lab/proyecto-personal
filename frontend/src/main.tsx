import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppUiProvider } from './context'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppUiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppUiProvider>
  </StrictMode>,
)
