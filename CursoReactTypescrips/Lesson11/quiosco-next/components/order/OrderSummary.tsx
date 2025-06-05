"use client";

import { useStore } from "@/src/store";
import ProductDetails from "@/components/order/ProductDetails";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema/index";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.price * item.quantity, 0),
    [order]
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    const data = {
      name,
      order,
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      
      const errorMessage =
        result.error.format().name?._errors?.[0] || "Datos inválidos";
        toast.error(errorMessage )
      setError(errorMessage);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createOrder(result.data);
      setSuccess(true);
            toast.success(`✅ Pedido de ${result.data.name} por un total de ${formatCurrency(total)} creado correctamente`);


    } catch (err) {
      setError("Error al enviar el pedido");
      console.log("Error al enviar el pedido:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-gray-50 shadow-inner">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center mt-5 text-gray-500">El pedido está vacío</p>
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

      <form onSubmit={handleCreateOrder} className="w-full mt-10 space-y-5">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Tu Nombre"
          required
          className="bg-white border border-gray-200 rounded-md p-2 w-full"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm font-medium">Pedido enviado 🎉</p>
        )}
        <input
          type="submit"
          value={isLoading ? "Enviando..." : "Confirmar Pedido"}
          disabled={isLoading}
          className="py-2 rounded uppercase text-white bg-black hover:bg-indigo-800 w-full text-center cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </aside>
  );
}
