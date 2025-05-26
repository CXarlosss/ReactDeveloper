// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
export default function AppLayout() {
  return (
    <div>
      {/* Aquí puedes agregar un encabezado, barra de navegación, etc. */}
      <header className="bg-gray-800 text-white p-4">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </section>

      <footer className="py-5">
        <p className="text-center">
            Todos los derechos reservados &copy; {new Date().getFullYear()} - OP_Task
        </p>
      </footer>
    </div>
  );
}
