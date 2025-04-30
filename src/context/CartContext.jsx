import { createContext, useContext, useState } from 'react'

// 1. Create Context
const CartContext = createContext()

// 2. Create Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product])
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

// 3. Create custom hook
export function useCart() {
  return useContext(CartContext)
}
