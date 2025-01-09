import ReactDOM from 'react-dom/client'
import "./index.css"
import { router } from './router'
import { App } from './app'
import { AuthProvider } from './modules/auth/context/auth-context'
import { Toaster } from './components/ui/toaster'

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  )
}
