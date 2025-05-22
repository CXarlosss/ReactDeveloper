// src/types/product.d.ts
export interface Product {
  id: string; // O number, según tu API
  name: string;
  price: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

// Si tu API usa un DTO para crear o actualizar, defínelo aquí
export interface ProductFormData {
  name: string;
  price: number;
  availability: boolean;
}