import React from 'react';

const ProductCard = ({ product, addToCart, cartItems = [] }) => {
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="col-12 col-md-6 mb-4 d-flex justify-content-center">
      <div className="card flex-row shadow-sm border-0 rounded-4 product-card-horizontal" style={{ maxWidth: '600px' }}>
        
        {/* Imagen */}
        <div className="product-img-wrapper">
          <img
            src={product.images[0]}
            alt={product.name}
            className="img-fluid product-img"
            onMouseOver={e => e.currentTarget.src = product.images[1]}
            onMouseOut={e => e.currentTarget.src = product.images[0]}
            style={{ width: '200px', height: 'auto', objectFit: 'cover', borderRadius: '8px 0 0 8px' }}
          />
        </div>

        {/* Contenido */}
        <div className="card-body d-flex flex-column justify-content-between p-3 w-100">
          <div>
            <h2 className="fw-bold fs-4 text-success text-center">{product.name}</h2>
            <p className="text-muted small mt-2 text-center">{product.description}</p>
          </div>

          <div className="text-center mt-3">
            <p className="fs-5 text-success fw-bold">${product.price.toFixed(2)}</p>
            <button
              className={`btn btn-${isInCart ? 'secondary' : 'green'} btn-sm w-100 text-uppercase`}
              onClick={() => !isInCart && addToCart(product)}
              disabled={isInCart}
            >
              {isInCart ? 'Añadido ✅' : 'Añadir a la cesta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
