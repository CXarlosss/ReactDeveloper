// @ts-nocheck

import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import {AllRoutes} from '../src/routes/AllRoutes'
import {Header, Footer} from './components/index'

import './App.css'
function App() {
 

  return (
    <div className='App'>
      <Header />
      <AllRoutes/>
      <Footer />
    </div>
  )
}

export default App
