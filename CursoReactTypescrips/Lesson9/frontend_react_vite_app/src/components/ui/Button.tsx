// src/components/Button.tsx
import React, { type ButtonHTMLAttributes } from 'react';

// Define las props que tu botón puede aceptar, extendiendo las props HTML estándar de un botón
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning'; // Define variantes de estilo
  children: React.ReactNode; // Contenido del botón
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', // Valor por defecto
  className = '', // Para añadir clases adicionales si es necesario
  ...rest // Captura el resto de las props estándar de un botón (onClick, disabled, etc.)
}) => {
  let baseStyles = 'font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-75';
  
  switch (variant) {
    case 'primary':
      baseStyles += ' bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'secondary':
      baseStyles += ' bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-300';
      break;
    case 'danger':
      baseStyles += ' bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'warning':
      baseStyles += ' bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400';
      break;
    default:
      break;
  }

  // Combina las clases base con las clases adicionales que se pasen
  const finalClassName = `${baseStyles} ${className}`;

  return (
    <button className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;