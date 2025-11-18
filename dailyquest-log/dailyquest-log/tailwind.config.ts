import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definición de la paleta de verdes y grises
        'primary-green': {
          DEFAULT: '#22c55e', // green-500
          light: '#dcfce7',   // green-50
          lighter: '#f0fdf4', // green-10 (aún más claro si lo necesitas)
          dark: '#16a34a',    // green-600
          darker: '#15803d',   // green-700
          darkest: '#0c4a30',  // Un verde muy oscuro, casi negro si lo requieres
        },
        'custom-gray': {
          DEFAULT: '#4b5563', // gray-600
          dark: '#1f2937',    // gray-800
          light: '#6b7280',   // gray-500
          lighter: '#e5e7eb', // gray-200 (para bordes y fondos muy claros)
        },
      },
      // Puedes extender otras propiedades aquí si es necesario (ej. espaciado, tipografía)
    },
  },
  plugins: [],
};
export default config;