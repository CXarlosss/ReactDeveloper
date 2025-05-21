import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🛍️ Listado de Productos
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50"
            >
              <div>
                <p className="text-lg font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Precio: <span className="text-gray-700 font-semibold">{product.price}€</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.availability
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.availability ? "Disponible" : "No disponible"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
