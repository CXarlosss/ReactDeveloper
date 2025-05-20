import { Request, Response } from 'express';
import { product } from '../models/Product.model';

export const createProduct = async (product: product) =>
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
