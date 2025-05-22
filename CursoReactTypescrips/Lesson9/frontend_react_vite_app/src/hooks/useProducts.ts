// src/hooks/useProducts.ts
import { useState, useEffect, useCallback } from 'react';
import { 
    getProducts as apiGetProducts, // Renombramos para evitar conflicto de nombres
    createProduct as apiCreateProduct,
    updateProduct as apiUpdateProduct,
    deleteProduct as apiDeleteProduct,
    getProductById as apiGetProductById // <-- Añadir esta importación
} from '../api/products';
import type { Product, ProductFormData } from '../types/product.d';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiGetProducts();
            setProducts(data);
        } catch (err) {
            setError('Error al cargar los productos. Por favor, inténtelo de nuevo.');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // <-- Añadir esta nueva función para obtener un producto por ID
    const getProduct = useCallback(async (id: string): Promise<Product | null> => {
        setLoading(true); // Podrías tener un loading específico para el producto individual
        setError(null);
        try {
            const product = await apiGetProductById(id);
            setLoading(false);
            return product;
        } catch (err) {
            setError(`Error al cargar el producto con ID ${id}.`);
            console.error(`Error loading product with ID ${id}:`, err);
            setLoading(false);
            return null;
        }
    }, []);

    const addProduct = useCallback(async (productData: ProductFormData) => {
        setLoading(true);
        setError(null);
        try {
            const newProduct = await apiCreateProduct(productData);
            setProducts(prevProducts => [...prevProducts, newProduct]);
            setLoading(false);
            return newProduct;
        } catch (err) {
            setError('Error al crear el producto. Por favor, inténtelo de nuevo.');
            console.error('Error creating product:', err);
            setLoading(false);
            throw err; // Re-throw to allow component to handle specific errors
        }
    }, []);

    const updateProduct = useCallback(async (id: string, productData: ProductFormData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedProduct = await apiUpdateProduct(id, productData);
            setProducts(prevProducts => prevProducts.map(p => p.id === id ? updatedProduct : p));
            setLoading(false);
            return updatedProduct;
        } catch (err) {
            setError('Error al actualizar el producto. Por favor, inténtelo de nuevo.');
            console.error('Error updating product:', err);
            setLoading(false);
            throw err;
        }
    }, []);

    const removeProduct = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await apiDeleteProduct(id);
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
        } catch (err) {
            setError('Error al eliminar el producto. Por favor, inténtelo de nuevo.');
            console.error('Error deleting product:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return {
        products,
        loading,
        error,
        loadProducts,
        getProduct, // <-- Exportar la nueva función
        addProduct,
        updateProduct,
        removeProduct
    };
};