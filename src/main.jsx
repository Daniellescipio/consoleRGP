import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { PlayerProvider } from './logic/usePlayer.jsx'
import { TypingProvider } from './logic/useTyping.jsx'
import { FunctionProvider } from './logic/functions.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerProvider>
      <TypingProvider>
        <FunctionProvider>
          <App />
        </FunctionProvider>
      </TypingProvider>
    </PlayerProvider>
  </React.StrictMode>,
)
