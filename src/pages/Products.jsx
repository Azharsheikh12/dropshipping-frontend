import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button
} from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'


export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const scrollRef = useRef(null)
  const { addToCart } = useCart()


  const categories = ['all', 'electronics', 'clothing', 'home', 'books', 'toys']

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleWheel = (e) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      scrollContainer.scrollLeft += e.deltaY
    }

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const fetchProducts = (category = '') => {
    setLoading(true)

    const url = category && category !== 'all'
      ? `http://localhost:3000/api/v1/products/category?category=${category}`
      : `http://localhost:3000/api/v1/products`

    console.log('Fetching products from:', url)

    const token = localStorage.getItem('token')

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    })
      .then(res => {
        if (!res.ok) {
          console.error(`API call failed: ${res.status} ${res.statusText}`)
          throw new Error('Failed to fetch products')
        }
        return res.json()
      })
      .then(data => {
        console.log('Fetched products:', data)
        setProducts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const truncateText = (text, maxLength = 18) => {
    if (!text) return ''
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <>
      {/* Category Filter */}
      <Box sx={{ backgroundColor: '#fafafa', py: 2, px: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {categories.map(cat => (
            <Grid item key={cat}>
              <Button
                variant={selectedCategory === cat ? 'contained' : 'outlined'}
                size="small"
                onClick={() => {
                  setSelectedCategory(cat)
                  fetchProducts(cat)
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Product Grid */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          fontWeight={600}
          textAlign="center"
        >
          Featured Products
        </Typography>

        {/* Show message when no products */}
        {!loading && products.length === 0 && (
          <Typography textAlign="center" mt={4}>
            No products found.
          </Typography>
        )}

        <Box
          ref={scrollRef}
          sx={{
            overflowX: 'auto',
            px: 2,
            cursor: 'grab',
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              py: 2,
              minHeight: 360,
              scrollSnapType: 'x mandatory',
            }}
          >
            {products.map(product => (
              <Card
                key={product.id}
                sx={{
                  minWidth: 220,
                  maxWidth: 240,
                  height: 340,
                  flexShrink: 0,
                  borderRadius: 2,
                  scrollSnapAlign: 'start',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 1,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    height: 140,
                    objectFit: 'contain',
                    p: 1,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, width: '100%', p: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '18px',
                      height: 36,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    {truncateText(product.name)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mt: 1, fontWeight: 600 }}
                  >
                    ₹{product.price}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                    <Button
                      component={Link}
                      to={`/products/${product.id}`}
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      View Product
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: 'none' }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

      </Container>
    </>
  )
}
