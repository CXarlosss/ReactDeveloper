// @ts-nocheck
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo1.png"; // Asegúrate de tener tu logo

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      {/* Logo y nombre */}
      <Link to="/" className="flex items-center gap-3">
        <img src={Logo} alt="Magic Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Magic Shop</h1>
      </Link>

      {/* Navegación */}
      <nav className="flex gap-6 items-center text-gray-600 dark:text-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600 dark:text-blue-400" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600 dark:text-blue-400" : "hover:text-blue-600"
          }
        >
          Cart
        </NavLink>
      </nav>

      {/* Botón carrito */}
      <Link
        to="/cart"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        Cart: 2
      </Link>
    </header>
  );
};

