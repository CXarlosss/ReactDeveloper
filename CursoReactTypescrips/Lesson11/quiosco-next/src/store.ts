import { create } from "zustand";
import { OrderItem } from "./types";

interface Store {
  order: OrderItem[];

  // Acciones
  addToOrder: (item: OrderItem) => void;
  removeFromOrder: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  addToOrder: (item) => {
    const existing = get().order.find((i) => i.id === item.id);
    if (existing) {
      set({
        order: get().order.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                subtotal: (i.quantity + item.quantity) * i.price,
              }
            : i
        ),
      });
    } else {
      set((state) => ({
        order: [...state.order, item],
      }));
    }
  },

  removeFromOrder: (id) =>
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.price,
            }
          : item
      ),
    })),

  clearOrder: () => set({ order: [] }),
}));
