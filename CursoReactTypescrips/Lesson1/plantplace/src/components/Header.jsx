import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
  cartItems = [],
  increaseQty,
  decreaseQty,
  removeFromCart,
}) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header-bar">
      <div className="container-xl d-flex align-items-center justify-content-between header-inner">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img
              src="/img/Logo1.png"
              alt="Logo de PlantPlace"
              style={{ width: "100px", height: "auto", display: "block" }}
            />
          </Link>
          
        </div>

        {/* Título */}
        <div className="header-title text-center">
          <h1 className="m-0">PlantPlace</h1>
        </div>

        {/* Carrito + Login */}
        <div className="header-cart d-flex align-items-center gap-3 position-relative">
          <div className="cart-dropdown position-relative">
            <img className="cart-icon" src="/img/carrito.png" alt="Carrito" />

            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}

            {/* Mini resumen del carrito */}
            <div className="cart-preview">
              {cartItems.length === 0 ? (
                <p className="text-center">Carrito vacío 🛒</p>
              ) : (
                <>
                  <div className="cart-preview-items">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center mb-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="me-2"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                        <div className="flex-grow-1">
                          <p className="m-0 fw-bold">{item.name}</p>
                          <small>Cantidad: {item.quantity}</small>
                        </div>
                        <div className="ms-2 d-flex align-items-center gap-1">
                          <button
                            className="btn btn-sm btn-outline-dark py-0 px-2"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-sm btn-outline-dark py-0 px-2"
                            onClick={() => decreaseQty(item.id)}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-sm btn-danger py-0 px-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/cart"
                    className="btn btn-sm btn-success w-100 mt-2"
                  >
                    Ver carrito completo
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setIsAuthenticated(!isAuthenticated)}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
