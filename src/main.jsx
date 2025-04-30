import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { CartProvider } from './context/CartContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <CartProvider>
    <BrowserRouter>
        <App />

    </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
)
