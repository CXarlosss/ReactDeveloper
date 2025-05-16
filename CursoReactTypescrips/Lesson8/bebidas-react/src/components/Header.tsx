import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header style={{
      backgroundColor: '#2d3748', // Más oscuro
      paddingTop: '1.25rem',   // Padding un poco mayor
      paddingBottom: '1.25rem',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Sombra más sutil
      borderBottom: '1px solid #4a5568', //Borde inferior
    }}>
      <div style={{
        margin: '0 auto',
        maxWidth: '1200px', // Ancho máximo un poco mayor
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="logotipo"
            style={{
              width: '6rem',       // Logo más pequeño
              marginRight: '1.5rem', // Más margen
              transition: 'transform 0.2s ease-in-out', // Transición suave
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Efecto hover
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <h1 style={{
            color: '#f7fafc', // Casi blanco
            fontWeight: '600',  // Semibold
            fontSize: '2rem',    // Más grande
            letterSpacing: '-0.025em', // Espaciado entre letras
          }}>
            Bebidas App
          </h1>
        </div>
        <nav>
          <div style={{ display: 'flex' }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? '#a0aec0' : '#ffffff', // Gris más claro al active
                marginRight: '1.5rem',
                fontWeight: '500', // Medium
                textDecoration: 'none', // Sin subrayado
                transition: 'color 0.2s ease-in-out', // Transición de color
                padding: '0.5rem', // Añadido padding
                borderRadius: '0.375rem', // Añadido border radius
                '&:hover': {
                  color: '#d1d8e3', // Color de hover
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo al hover muy sutil
                },
              })}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              style={({ isActive }) => ({
                color: isActive ? '#a0aec0' : '#ffffff',
                marginRight: '0', // Sin margen derecho en el último
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s ease-in-out',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                '&:hover': {
                  color: '#d1d8e3',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              })}
            >
              Favoritos
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
