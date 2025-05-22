// src/components/ui/Input.tsx
import React, { type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ 
  className = '', 
  type = 'text', 
  // Desestructuramos 'checked' y 'value' explícitamente para manejarlos
  checked, 
  value, 
  onChange, // También pasamos onChange explícitamente si queremos añadir lógica aquí
  ...rest 
}) => {
  let baseStyles = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500';
  
  // Clases específicas para checkbox para que no aplique el 'w-full' que suele ser problemático
  if (type === 'checkbox') {
    baseStyles = 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'; // Estilos específicos para checkbox
  }

  const finalClassName = `${baseStyles} ${className}`;

  // Para checkboxes, usamos 'checked' y no 'value'
  if (type === 'checkbox') {
    return (
      <input
        type="checkbox"
        className={finalClassName}
        checked={checked} // Usamos la prop checked
        onChange={onChange} // Pasamos el onChange tal cual viene
        {...rest}
      />
    );
  }

  // Para otros tipos de input, usamos 'value'
  return (
    <input 
      type={type} 
      className={finalClassName} 
      value={value} // Usamos la prop value
      onChange={onChange} // Pasamos el onChange tal cual viene
      {...rest} 
    />
  );
};

export default Input;