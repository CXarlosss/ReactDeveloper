// src/components/ProductCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product.d";

// Importa tu componente Button
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const numericPrice = parseFloat(product.price as unknown as string);
  const displayPrice = isNaN(numericPrice) ? "N/A" : numericPrice.toFixed(2);

  return (
    <li className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-700 mb-1">
          Precio: <span className="font-bold">${displayPrice}</span>
        </p>
        <p className="text-gray-700 mb-4">
          Disponibilidad:{" "}
          {product.availability ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
              ✅ En stock
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
              ❌ Agotado
            </span>
          )}
        </p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {/* Usamos Link envolviendo un Button para mantener el estilo consistente */}
        <Link to={`/products/edit/${product.id}`}>
          <Button variant="warning">
            Editar
          </Button>
        </Link>
        {/* Usamos el componente Button */}
        <Button
          variant="danger" // Usamos la variante 'danger'
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </Button>
      </div>
    </li>
  );
};

export default ProductCard;