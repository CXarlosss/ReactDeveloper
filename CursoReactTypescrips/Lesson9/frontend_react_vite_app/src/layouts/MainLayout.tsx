// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Importa la Navbar

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar /> {/* <-- Primer encabezado (Navbar personalizada) */}

     

      <main className="flex-grow py-8">
        <Outlet /> {/* Aquí se renderizarán las páginas */}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Mi Aplicación de Productos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
