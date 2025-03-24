
import './App.css'
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
    <div className='newClass'>
      <Header/>
      <Home/>
      <Footer/>
      <Contact/>
      <ProductDetail/>
      <ProductList/>
    </div>
    </>
    
  )
}

export default App
