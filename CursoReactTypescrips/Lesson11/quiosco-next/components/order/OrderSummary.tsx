"use client";

import { useStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const removeFromOrder = useStore((state) => state.removeFromOrder); // si tienes esta acción

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-gray-50 shadow-inner">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center mt-5 text-gray-500">El carrito está vacío</p>
      ) : (
        <div className="mt-5 space-y-4">
          {order.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 bg-white shadow flex flex-col gap-2"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-700">Cantidad: {item.quantity}</p>
              <p className="text-indigo-600 font-bold">
                Subtotal: {formatCurrency(item.subtotal)}
              </p>

              {/* Botón para eliminar (si tienes implementado removeFromOrder) */}
              {removeFromOrder && (
                <button
                  onClick={() => removeFromOrder(item.id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-bold transition"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
