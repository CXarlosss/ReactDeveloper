"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderItem } from "@/src/types";

interface CreateOrderParams {
  name: FormDataEntryValue | null;
  order: OrderItem[];
}

export async function createOrder({ name, order }: CreateOrderParams) {
    
  if (!name || typeof name !== "string") {
    throw new Error("El nombre es obligatorio.");
  }

  if (!order || order.length === 0) {
    throw new Error("El pedido no puede estar vacío.");
  }

  const total = order.reduce((acc, item) => acc + item.subtotal, 0);


  try {
    const newOrder = await prisma.order.create({
      data: {
        name,
        total,
        orderItems: {
          create: order.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return {
      success: true,
      orderId: newOrder.id,
      message: `Pedido creado correctamente para ${name}`,
    };
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    return {
      success: false,
      message: "Error al procesar el pedido.",
    };
  }
}
