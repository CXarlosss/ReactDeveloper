
import React from 'react';
import Logo from "../assets/logo.png";
export const Header = () => {
  return (
      <div>
        <h1>Hello WOrld Header</h1>
        <img className='logo' src={Logo} alt="" />
    </div>
  )
}
