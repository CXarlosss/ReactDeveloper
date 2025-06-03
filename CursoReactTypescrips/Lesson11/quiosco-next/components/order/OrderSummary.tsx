"use client";

import { useStore } from "@/src/store";
import ProductDetails from "@/components/order/ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.price * item.quantity, 0),
    [order]
  );
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-gray-50 shadow-inner">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center mt-5 text-gray-500">El carrito está vacío</p>
      ) : (
        <div className="mt-5 space-y-4">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}
      <div className="mt-10 p-5 bg-indigo-100 rounded-xl shadow-md text-center">
        <p className="text-xl font-semibold text-indigo-700 mb-2">
          Total a pagar:
        </p>
        <p className="text-3xl font-extrabold text-indigo-900">
          {formatCurrency(total)}
        </p>
      </div>
    </aside>
  );
}
