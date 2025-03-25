import './App.css'
import { Routes, Route, Navigate  } from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import ProductList from './components/ProductList'
import Contact from './components/Contact'
import Admin from './components/Admin'
import  PageNoFound from './components/PageNoFound.jsx'
import ContactEu from './components/contact/ContactEu'
import ContactUs from './components/contact/ContactUs'
import ContactIn from './components/contact/ContactIn'
function App() {
  const user = false

  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/contact' element={<Contact />} >
            <Route path='eu' element={<ContactEu />} />
            <Route path='us' element={<ContactUs />} />
            <Route path='in' element={<ContactIn />} />
          </Route>
          <Route path='/admin' element={user ? <Admin/> : <Navigate to="/" />} />  
          <Route path='*' element={<PageNoFound  />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
