import React from 'react'

const CartItem = ({ item }) => {
  return (
    <tr>
      <td>
        <img className="img-fluid" src={item.image} alt={`Imagen de ${item.name}`} />
      </td>
      <td>{item.name}</td>
      <td className="fw-bold">${item.price}</td>
      <td className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-dark" aria-label="Disminuir cantidad">-</button>
        {item.quantity}
        <button type="button" className="btn btn-dark" aria-label="Aumentar cantidad">+</button>
      </td>
      <td>
        <button className="btn btn-danger" type="button" aria-label="Eliminar producto">X</button>
      </td>
    </tr>
  )
}

export default CartItem
