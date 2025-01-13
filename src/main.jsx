import React from 'react'
import ReactDom from 'react-dom/client'
import App from './components/App.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
