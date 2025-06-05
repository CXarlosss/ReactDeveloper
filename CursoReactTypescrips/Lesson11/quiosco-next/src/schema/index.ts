import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number().min(1),
  subtotal: z.number(),
});

export const OrderSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  order: z.array(OrderItemSchema).min(1, { message: "El pedido no puede estar vacío" }),
});
