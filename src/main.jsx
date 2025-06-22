import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TokenProvider } from './common/context/token-context.jsx'
import { TracksContext, TracksProvider } from './common/context/tracks-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <TracksProvider>
    <App />
    </TracksProvider>
    </TokenProvider>
  </StrictMode>,
)
