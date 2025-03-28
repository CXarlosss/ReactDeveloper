// @ts-nocheck
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo1.png";

export const Header = ({ favoritesCount = 0 }) => {
  return (
    <header className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 fixed top-0 left-0 w-full z-50 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo y nombre */}
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Magic Logo" className="w-10 h-10 rounded-full shadow" />
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Magic<span className="text-blue-600 dark:text-blue-400">Shop</span>
          </h1>
        </Link>

        {/* Navegación */}
        <nav className="hidden sm:flex gap-6 items-center text-gray-700 dark:text-gray-300 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "hover:text-blue-600 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "hover:text-blue-600 transition"
            }
          >
            Favoritos
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "hover:text-blue-600 transition"
            }
          >
            Carrito
          </NavLink>
        </nav>

        {/* Botón carrito */}
        <Link
          to="/cart"
          className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          🛒 <span>Cart</span>
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {favoritesCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
