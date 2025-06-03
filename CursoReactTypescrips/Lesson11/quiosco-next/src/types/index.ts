// src/types/index.ts
import { Product } from "@prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price" | "image"> & {
  quantity: number;
  subtotal: number;
};
