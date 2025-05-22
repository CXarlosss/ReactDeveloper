import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Definimos una interfaz para tipar mejor los productos,
// asumiendo que vienen con 'id', 'name', 'price', 'availability'.
interface Product {
  id: string; // Asumiendo que el ID es un string (UUID o similar)
  name: string;
  price: number;
  availability: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]); // Tipamos el estado
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  const fetchProducts = () => {
    setLoading(true); // Iniciar carga
    setError(null); // Limpiar errores previos
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false); // Finalizar carga
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(
          "No se pudieron cargar los productos. Inténtalo de nuevo más tarde."
        ); // Mensaje para el usuario
        setLoading(false); // Finalizar carga con error
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    // Asegúrate de que el ID sea string
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts(); // Actualiza la lista tras eliminar
      } else {
        const errorData = await res.json();
        console.error(
          "Error al eliminar el producto:",
          errorData.message || "Error desconocido"
        );
        alert(
          `Error al eliminar el producto: ${
            errorData.message || "Error desconocido"
          }`
        );
      }
    } catch (err) {
      console.error("Error en la solicitud DELETE:", err);
      alert("No se pudo eliminar el producto. Verifica tu conexión.");
    }
  };

  // --- Estilos para los estados de carga y error ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <p className="text-xl font-semibold text-blue-700 animate-pulse">
          Cargando productos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <p className="text-xl font-semibold text-red-600">❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight text-center sm:text-left">
            🛍️ Listado de Productos
          </h1>
          <Link
            to="/products/new"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150 transform hover:scale-105"
          >
            ➕ Añadir Producto
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-10">
            No hay productos disponibles. ¡Crea uno nuevo!
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {" "}
            {/* Diseño de cuadrícula para productos */}
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    Precio:{" "}
                    <span className="font-extrabold text-blue-700">
                      €
                      {typeof product.price === "number"
                        ? product.price.toFixed(2)
                        : product.price}
                    </span>
                  </p>
                  <span
                    className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
                      product.availability
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } border ${
                      product.availability
                        ? "border-green-300"
                        : "border-red-300"
                    }`}
                  >
                    {product.availability
                      ? "✅ Disponible"
                      : "🚫 No disponible"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition ease-in-out duration-150"
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
