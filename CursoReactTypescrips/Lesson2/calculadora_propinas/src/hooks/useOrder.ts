// hooks/useOrder.ts
import { useState } from 'react';
import type { MenuItem, OrderItem } from '../types';

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [auth, setAuth] = useState(false);

  const addItem = (item: MenuItem) => {
    const itemExists = order.find((orderItem) => orderItem.id === item.id);

    if (itemExists) {
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  return {
    order,
    setOrder,
    total,
    setTotal,
    auth,
    setAuth,
    addItem,
  };
}
