import React from "react";
import CartItem from "./CartItem";

const CartPage = ({
  cartItems = [],
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
}) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
<div className="cart-page container-xl py-5">
<h2 className="text-center mb-4">Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">El carrito está vacío 🛒</p>
      ) : (
        <>
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  removeFromCart={removeFromCart}
                />
              ))}
            </tbody>
          </table>

          <div className="text-end mt-4">
            <p className="fs-5 border-top pt-3 mt-4">
              Total a pagar: <strong>${total.toFixed(2)}</strong>
            </p>

            <button className="btn btn-dark w-100 mt-3" onClick={clearCart}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
