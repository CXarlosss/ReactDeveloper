// @ts-nocheck
import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Importamos los estilos

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [url, setUrl] = useState("http://localhost:8000/products");
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        fetch(url) // Ahora usa la URL dinámica
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching products:", error));
    }, [url]); // Se ejecutará cada vez que cambie `url`

    useEffect(() => {
        console.log(counter);
    }, [counter]); // Se ejecutará cada vez que cambie `counter`

    return (
        <section className="product-container">
            <div className="filter">
                <button onClick={() => setCounter(counter + 1)}>Counter: {counter}</button>
                <button onClick={() => url !== "http://localhost:8000/products" && setUrl("http://localhost:8000/products")}>
                    All
                </button>
                <button onClick={() => setUrl("http://localhost:8000/products?in_stock=true")}>
                    In Stock
                </button>
            </div>

            {products.map(product => (
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
