// src/components/Navbar.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
          Gestión de Productos
        </Link>
        <div className="space-x-4">
          {/* NavLink para resaltar la ruta activa */}
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive 
                ? "text-yellow-300 font-bold px-3 py-2 rounded-md transition duration-300" 
                : "text-white hover:text-blue-200 px-3 py-2 rounded-md transition duration-300"
            }
          >
            Lista de Productos
          </NavLink>
          <NavLink
            to="/products/new"
            className={({ isActive }) => 
              isActive 
                ? "text-yellow-300 font-bold px-3 py-2 rounded-md transition duration-300" 
                : "text-white hover:text-blue-200 px-3 py-2 rounded-md transition duration-300"
            }
          >
            Añadir Nuevo Producto
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;