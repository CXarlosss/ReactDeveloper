import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import Navmenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <div>
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
          <Navmenu />
        </div>
      </header>

      {/* Contenido central */}
      <section className="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </section>

      {/* Footer */}
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados &copy; {new Date().getFullYear()} - OP_Task
        </p>
      </footer>
    </div>
  );
}
