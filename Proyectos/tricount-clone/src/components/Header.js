// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
export const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo">
          💸 Tricount Clone
        </Link>
      </div>
    </header>
  );
};
