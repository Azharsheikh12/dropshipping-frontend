import { useState } from 'react'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function CreateOrder() {
  const [formData, setFormData] = useState({ product_id: '', customer_id: '', status: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3000/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: formData })
    })
    alert("Order created!")
    navigate('/orders')
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Create New Order</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Product ID"
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Customer Id"
          name="customer_id"
          type="number"
          value={formData.customer_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Availablity Status"
          name="status"
          type="string"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Create Order</Button>
      </Box>
    </Container>
  )
}
