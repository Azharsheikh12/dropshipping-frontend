import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
  Button
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { cartItems } = useCart()

  const handleLoginMenu = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                component="img"
                src="/iconshop.jpg"
                alt="Logo"
                sx={{ height: 40 }}
              />
              <Typography variant="h6" fontWeight={600} color="primary">
                Store
              </Typography>
            </Box>
          </Link>

          {/* Search Box */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: '#f1f1f1',
                px: 1
              }}
            >
              <SearchIcon
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
              <InputBase
                placeholder="Search products..."
                sx={{ pl: 4, width: 200 }}
              />
            </Box>

            {/* Cart Icon */}
            <IconButton color="inherit" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Login/Signup Menu */}
            <IconButton onClick={handleLoginMenu} color="inherit">
              <LoginIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem component={Link} to="/login" onClick={handleClose}>
                Login
              </MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleClose}>
                Signup
              </MenuItem>
              <MenuItem component={Link} to="/logout" onClick={handleClose}>
                Logout
              </MenuItem>
            </Menu>

            {/* Optional: Account Icon */}
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Cart */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            My Cart
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          {cartItems.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Your cart is empty.
            </Typography>
          ) : (
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <ListItemText primary={item.name} secondary={`₹${item.price}`} />
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          {/* Checkout Button */}
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
