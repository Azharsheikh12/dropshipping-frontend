# 🛍 Dropshipping Store Frontend (React)

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Vite](https://img.shields.io/badge/Vite-4.x-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-blueviolet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

### 🛒 Shopping Experience
- Browse products with category filters
- Search functionality
- Product detail pages
- Shopping cart system
- Checkout process

### 🔐 User Features
- User registration/login
- Order history view
- Profile management

### 🚀 Performance
- Fast loading with lazy components
- Responsive mobile-first design
- Optimized API calls

## 📦 Pages & Components

### 🌐 Main Pages
| Page | Description |
|------|-------------|
| `/` | Homepage with featured products |
| `/products` | Full product catalog |
| `/products/:id` | Single product details |
| `/cart` | Shopping cart page |
| `/checkout` | Order checkout |
| `/orders` | User's order history |
| `/profile` | User profile management |

### 🧩 Key Components
- `ProductGrid` - Displays product listings
- `CartSummary` - Shows cart items and totals
- `AuthForm` - Handles login/registration
- `CheckoutSteps` - Guides through checkout
- `OrderCard` - Displays order information

## 🛠 Tech Stack

### Core
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite 4
- **Styling**: TailwindCSS 3
- **State Management**: Context API

### API Integration
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

### UI/UX
- **Icons**: Lucide React
- **Loading States**: React Skeleton
- **Notifications**: Sonner toast

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ or yarn 1.22+

### Installation
```bash
# Clone repository
git clone https://github.com/yourrepo/dropshipping-frontend.git
cd dropshipping-frontend

# Install dependencies
npm install

# Start development server
npm run dev


### Environment Setup

Create a .env file:

VITE_API_BASE_URL=http://localhost:3000/api/v1

###🏗 Project Structure

src/
├── components/      # Reusable UI components
├── context/         # React context providers
├── hooks/           # Custom hooks
├── pages/           # Page components
├── services/        # API service functions
├── types/           # TypeScript types
├── utils/           # Utility functions
└── App.tsx          # Main application


### 🎨 UI Examples

# Product Listing

<ProductCard
  id={product.id}
  name={product.name}
  price={product.price}
  image={product.image}
  onAddToCart={() => addToCart(product)}
/>


# Cart Page

<CartPage
  items={cartItems}
  onRemoveItem={removeItem}
  onUpdateQuantity={updateQuantity}
  onCheckout={startCheckout}
/>

### 🧪 Testing

# Run unit tests
npm run test

# Run component tests
npm run test:components

### 🚀 Deployment

Static Hosting

# Build for production
npm run build

# Deploy build/ folder to your hosting service

### 📜 License
MIT License - See LICENSE for details

