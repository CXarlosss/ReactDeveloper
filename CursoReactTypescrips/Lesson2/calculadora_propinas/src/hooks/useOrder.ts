// hooks/useOrder.ts
import { useState } from "react";
import type { OrderItem, MenuItem } from "../types";
import { useAuth } from "../context/AuthContext";

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [tip, setTip] = useState(0);
  const [history, setHistory] = useState<OrderItem[][]>([]);
  const { username } = useAuth();

  const addItem = (item: MenuItem) => {
    const exists = order.find(o => o.id === item.id);
    if (exists) {
      setOrder(order.map(o =>
        o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
      ));
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id: number) => {
    setOrder(order.filter(o => o.id !== id));
  };

  const placeOrder = () => {
    if (!username || order.length === 0) return;

    const orderWithDate = order.map(o => ({
      ...o,
      date: new Date().toISOString().split("T")[0],
    }));

    setHistory([...history, orderWithDate]);
    setOrder([]);
    setTip(0);
  };

  return {
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    placeOrder,
    history, // 👈 ya devuelves la propiedad
  };
}
