// @ts-nocheck
import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { useFetch } from '../hooks/useFetch';
import Loading from '../assets/loading.gif';

export const ProductList = () => {
    const [url, setUrl] = useState("http://localhost:8000/products");
    const { data, loading, error } = useFetch(url);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log(counter);
    }, [counter]);

    return (
        <section className="product-container">
            <div className="filter">
                <button onClick={() => setCounter(counter + 1)}>Counter: {counter}</button>
                <button onClick={() => url !== "http://localhost:8000/products" && setUrl("http://localhost:8000/products")}>All</button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock=true")}>In Stock</button>
            </div>

            {loading && <p className='loading' ><img src={Loading} alt="loading" /></p>}
            
            {error && <p>Error loading products: {error.message}</p>}
            {data?.map(product => (
                <div className={`card ${product.in_stock ? "in-stock" : "out-of-stock"}`} key={product.id}>
                    <p className="id">ID: {product.id}</p>
                    <h2 className="name">{product.name}</h2>
                    <p className="price">Price: <strong>${product.price}</strong></p>
                    <p className="stock-status">
                        {product.in_stock ? "✅ In Stock" : "❌ Out of Stock"}
                    </p>
                </div>
            ))}
        </section>
    );
};
