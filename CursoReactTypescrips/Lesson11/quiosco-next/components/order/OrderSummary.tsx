"use client";

import { useStore } from "@/src/store";
import ProductDetails from "@/components/order/ProductDetails";


export default function OrderSummary() {
  const order = useStore((state) => state.order);

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
    </aside>
  );
}
