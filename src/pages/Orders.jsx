import { useEffect, useState } from 'react'
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product_id}</TableCell>
              <TableCell>{order.customer_id}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
