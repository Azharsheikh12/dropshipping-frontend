import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  Divider
} from '@mui/material'
import { useCart } from '../context/CartContext.jsx'


export default function ProductShow() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const token = localStorage.getItem('token')
    

  
    if (!token) {
      console.error('No token found. Redirect to login.')
      return
    }
  
    fetch(`http://localhost:3000/api/v1/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch product')
        }
        return res.json()
      })
      .then(data => setProduct(data))
      .catch(err => console.error(err))
  }, [id])
  

  if (!product) return <div>Loading...</div>

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Card elevation={3} sx={{ width: '100%', p: 3 }}>
        <Grid container spacing={4} alignItems="flex-start" wrap="nowrap">
          {/* 👈 Image on the Left */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 350,
                backgroundColor: '#fafafa'
              }}
            >
              {product.image && (
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              )}
            </Box>

            {/* Buttons under image */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                size="large"
                onClick={() => addToCart(product)} // ✅ Add this onClick
              >
                Add to Cart
              </Button>

              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
              >
                Buy Now
              </Button>
            </Box>
          </Grid>

          {/* 👉 Info on the Right */}
          <Grid item xs={12} md={4}>
            <Box sx={{ pr: 2 }}>
              <Typography variant="h5" fontWeight={600}>
                {product.name}
              </Typography>

              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                ₹{product.price}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {product.description || 'No description available.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
