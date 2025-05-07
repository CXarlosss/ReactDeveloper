import React from "react";
import CartItem from "./CartItem";

/**
 * @typedef {Object} Item
 * @property {number} id
 * @property {string} name
 * @property {string} image
 * @property {number} price
 * @property {number} quantity
 */

/**
 * @typedef {Object} Props
 * @property {Item[]} cartItems
 * @property {(id: number) => void} increaseQty
 * @property {(id: number) => void} decreaseQty
 * @property {(id: number) => void} removeFromCart
 * @property {() => void} clearCart
 */

/** @param {Props} props */
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
