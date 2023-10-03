import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { PlayerProvider } from './logic/usePlayer.jsx'
import { TypingProvider } from './logic/useTyping.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerProvider>
      <TypingProvider>
        <App />
      </TypingProvider>
    </PlayerProvider>
  </React.StrictMode>,
)
