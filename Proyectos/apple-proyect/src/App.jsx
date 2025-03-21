
import './App.css'
import React from 'react'
import  Navbar  from "./components/Navbar";
import  Hero  from "./components/Hero";
import  Highlight  from "./components/Highlights";


const App = () => {

  return (
      <main className="bg-black">
      <Navbar/>
      <Hero/>
      <Highlight/>
      </main>
  )
}

export default App

