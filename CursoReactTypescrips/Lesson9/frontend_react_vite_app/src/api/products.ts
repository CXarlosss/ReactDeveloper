// src/api/products.ts
import axios from 'axios';
import type { Product, ProductFormData } from '../types/product.d';

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<{ data?: Product[] }>(API_URL); // { data: [...] }
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  // Si tu backend devuelve directamente el array, quita el '.data'
  if (Array.isArray(response.data)) { 
    return response.data as Product[];
  }
  return []; 
};

export const createProduct = async (productData: ProductFormData): Promise<Product> => {
  // Asumiendo que tu backend devuelve el nuevo producto creado dentro de una propiedad 'data'
  const response = await axios.post<{ data: Product }>(API_URL, productData);
  return response.data.data; // O `response.data` si tu backend devuelve el producto directamente
};


export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<{ data: Product }>(`${API_URL}/${id}`); // { data: { ...product } }
  return response.data.data; // <--- Asumiendo que el producto está en response.data.data
};

export const updateProduct = async (id: string, productData: ProductFormData): Promise<Product> => {
  const response = await axios.put<{ data: Product }>(`${API_URL}/${id}`, productData); // { data: { ...product } }
  return response.data.data; // <--- Asumiendo que el producto actualizado está en response.data.data
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};