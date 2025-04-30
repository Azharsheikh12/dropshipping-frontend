// components/LogoutButton.jsx
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')     // Remove the JWT
    navigate('/login')                   // Redirect to login
  }

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
