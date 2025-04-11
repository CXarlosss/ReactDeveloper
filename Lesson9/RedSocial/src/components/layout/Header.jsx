import React from 'react'
import "../../styles/header.css"
import { Link } from "react-router-dom";

export const Header = () => (
  <header className="header">
    <h1 className="header__title">
      <Link to="/">CHORLYSOCIAL</Link>
    </h1>
  </header>
);
