// components/OrderHistory.tsx
import type { OrderItem } from "../types";

type OrderHistoryProps = {
  history: OrderItem[][];
};

export default function OrderHistory({ history }: OrderHistoryProps) {
  if (history.length === 0) {
    return <p className="text-center">No hay historial de órdenes aún.</p>;
  }

  return (
    <div>
      <h2 className="font-black text-2xl mb-5">Historial de Órdenes</h2>
      {history.map((orderGroup, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <p className="text-sm text-gray-500 mb-2">Orden #{index + 1}</p>
          <ul className="space-y-2">
            {orderGroup.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
