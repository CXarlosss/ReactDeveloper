import './App.css'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import ProductList from './components/ProductList'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <>
      <div className='App'>
        <header>Header</header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <footer>Footer</footer>
      </div>
    </>
  )
}


export default App
