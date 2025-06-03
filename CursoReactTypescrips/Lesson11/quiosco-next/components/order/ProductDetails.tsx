"use client";

import { OrderItem } from "@/src/types";
import { useStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import { XCircleIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
type ProductDetailsProps = {
  item: OrderItem;
};

export default function ProductDetails({ item }: ProductDetailsProps) {
  const removeFromOrder = useStore((state) => state.removeFromOrder);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const increase = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
      {/* Imagen */}
    <Image
  src={`/products/${item.image}.jpg`}
  alt={`Imagen de ${item.name}`}
  width={96}
  height={96}
  className="w-24 h-24 object-cover rounded-md"
/>


      {/* Detalles */}
      <div className="flex-1 space-y-3 w-full">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
          <button
            type="button"
            onClick={() => removeFromOrder(item.id)}
            className="text-red-600 hover:text-red-800"
          >
            <XCircleIcon className="h-7 w-7" />
          </button>
        </div>

        <p className="text-lg font-bold text-amber-600">
          {formatCurrency(item.price)}
        </p>

        {/* Selector de cantidad */}
        <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg w-fit">
          <button
            type="button"
            onClick={decrease}
            className="p-1 rounded hover:bg-gray-200"
          >
            <MinusIcon className="h-5 w-5 text-gray-700" />
          </button>

          <span className="text-lg font-semibold">{item.quantity}</span>

          <button
            type="button"
            onClick={increase}
            className="p-1 rounded hover:bg-gray-200"
          >
            <PlusIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="bg-indigo-50 rounded-lg px-3 py-2 text-indigo-800 font-bold text-sm">
          Subtotal:{" "}
          <span className="font-medium">{formatCurrency(item.subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
