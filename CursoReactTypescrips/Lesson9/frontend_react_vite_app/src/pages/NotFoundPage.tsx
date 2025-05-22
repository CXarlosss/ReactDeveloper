// src/pages/NotFoundPage.tsx

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-6">Página No Encontrada</p>
      <p className="text-lg text-gray-600 text-center max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <a href="/" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        Volver al inicio
      </a>
    </div>
  );
}

export default NotFoundPage; // <--- ¡Esta línea es CRUCIAL!