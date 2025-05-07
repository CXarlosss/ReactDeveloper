import React from "react";

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
 * @property {Item} item
 * @property {(id: number) => void} increaseQty
 * @property {(id: number) => void} decreaseQty
 * @property {(id: number) => void} removeFromCart
 */

/** @param {Props} props */
const CartItem = ({ item, increaseQty, decreaseQty, removeFromCart }) => {
  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={item.image}
          alt={`Imagen de ${item.name}`}
          style={{ width: "50px" }}
        />
      </td>
      <td>{item.name}</td>
      <td className="fw-bold">${item.price.toFixed(2)}</td>
      <td className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-dark"
          aria-label="Disminuir cantidad"
          onClick={() => decreaseQty(item.id)}
        >
          -
        </button>
        {item.quantity}
        <button
          type="button"
          className="btn btn-dark"
          aria-label="Aumentar cantidad"
          onClick={() => increaseQty(item.id)}
        >
          +
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          aria-label="Eliminar producto"
          onClick={() => removeFromCart(item.id)}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
