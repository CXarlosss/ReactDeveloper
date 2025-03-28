// @ts-nocheck
import React from "react";

export const CartCard= ({ item, onAdd, onRemove }) => {
  const { name, image, price, quantity } = item;

  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-md mb-4 dark:bg-gray-800 dark:text-white">
      {/* Imagen */}
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded" />

      {/* Detalles */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300">Precio: {price} €</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">Cantidad: {quantity}</p>
        <p className="text-sm font-bold mt-1">Total: {(price * quantity).toFixed(2)} €</p>
      </div>

      {/* Controles */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onAdd(item)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        >
          -
        </button>
      </div>
    </div>
  );
};

