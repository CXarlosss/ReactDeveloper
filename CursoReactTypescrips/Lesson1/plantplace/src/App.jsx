// @ts-nocheck
import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Cart from './components/Cart'
import Footer from './components/Footer'

function App() {
  // State to manage the cart
  const [cart, setCart] = React.useState([])

  // State to manage the authentication
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  React.useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated')
    }
  }, [isAuthenticated])
  

  return (
    <div className="d-flex flex-column min-vh-100">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
