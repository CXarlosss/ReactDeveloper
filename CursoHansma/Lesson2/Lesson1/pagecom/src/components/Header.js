// @ts-nocheck
import React from 'react'
import Logo from '../assets/logo.png';
import './header.css';
export const Header = () => {
  return (
    <header>
        <img className='logo' src= {Logo} alt="" />
        <a href="/">Home</a>
    </header>
  )
}

