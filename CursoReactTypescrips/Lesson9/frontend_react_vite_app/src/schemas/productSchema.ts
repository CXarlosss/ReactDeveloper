// src/schemas/productSchema.ts
import { object, string, number, boolean, minLength, minValue } from 'valibot'; // <--- Elimina booleanType
import type { ProductFormData } from '../types/product.d';

export const ProductSchema = object({
  name: string('El nombre es obligatorio', [
    minLength(3, 'El nombre debe tener al menos 3 caracteres')
  ]),
  price: number('El precio debe ser un número', [
    minValue(0, 'El precio no puede ser negativo')
  ]),
availability: boolean('La disponibilidad debe ser un valor booleano'), // <--- Usa boolean()
});

// Para la validación al editar (si el ID es parte del objeto validado)
// export const ProductEditSchema = object({
//   id: string(), // O number(),
//   name: string(), // ... y el resto del esquema
// });