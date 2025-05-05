import React from 'react'

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="col-12 col-md-6 mb-4 d-flex justify-content-center">
      <div className="card flex-row shadow-sm border-0 rounded-4 product-card-horizontal" style={{ maxWidth: '600px' }}>
        
        {/* Imagen a la izquierda */}
        <div className="product-img-wrapper">
          <img
            src={product.images[0]}
            alt={product.name}
            className="img-fluid product-img"
            onMouseOver={e => e.currentTarget.src = product.images[1]}
            onMouseOut={e => e.currentTarget.src = product.images[0]}
          />
        </div>

        {/* Contenido a la derecha */}
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <div>
            <h5 className="text-success fw-bold fs-5">{product.name}</h5>
            <p className="text-muted small">{product.description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fw-bold fs-6 text-dark">${product.price.toFixed(2)}</span>
            <button
              className="btn btn-dark btn-sm text-uppercase"
              onClick={() => addToCart(product)}
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
