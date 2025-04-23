import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import {Home, ProductDetail, ProductList, Contact, Admin, PageNotFound, ContactEu, ContactUs, ContactIn} from '../pages/index'

const AllRoutes = () => {
    const user = false
  return (
  <>
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
          <Route path='*' element={<PageNotFound  />} />
        </Routes>
        </>
  )
}

export default AllRoutes
