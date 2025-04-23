// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";

// Crear contexto
const ThemeContext = createContext(null);

// Proveedor
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Leer tema guardado
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);

  // Guardar y aplicar tema
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme); // O usa clases si prefieres
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado con validación
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
};
