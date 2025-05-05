import React from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

const Home = ({ addToCart }) => {
  return (
    <div className="container-xl py-5">
      <h2 className="mb-4 text-center">Nuestras plantas</h2>
      <div className="row justify-content-center g-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
