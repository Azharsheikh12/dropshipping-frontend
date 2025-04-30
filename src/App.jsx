import { Routes, Route, useLocation } from 'react-router-dom'
import Products from './pages/Products'
import ProductShow from './pages/ProductShow'
import CreateOrder from './pages/CreateOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'


function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductShow />} />
        <Route path="/orders/new" element={<CreateOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </>
  )
}

export default App
