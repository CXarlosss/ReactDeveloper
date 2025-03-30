// @ts-nocheck
import React from "react";
import { CartCard } from "../components/CartCard";

export const Cart = ({ cartItems = [], addToCart, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">🧺 Tu Carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">El carrito está vacío.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-xl font-semibold text-gray-800 dark:text-white">
              Total: <span className="text-green-600">{total.toFixed(2)} €</span>
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
};
