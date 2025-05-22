import { Link } from "react-router-dom";

export default function ErrorMessage() {
  return (
    <div className="text-center text-red-600 mt-10">
      <h1 className="text-3xl font-bold mb-4">❌ ¡Algo salió mal!</h1>
      <p className="mb-6">La ruta no existe o hubo un error inesperado.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
