import React from 'react'
import CartItem from './CartItem'

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Areca',
      price: 29.99,
      quantity: 1,
      image: '/img/Areca1.jpg'
    }
  ]

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="carrito">
      <img className="img-fluid" src="/img/carrito.png" alt="Carrito de compras" />

      <div id="carrito" className="bg-white p-3">
        {cartItems.length === 0 ? (
          <p className="text-center">El carrito está vacío</p>
        ) : (
          <>
            <table className="w-100 table">
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
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>

            <p className="text-end">
              Total a pagar: <span className="fw-bold">${total}</span>
            </p>

            <button className="btn btn-dark w-100 mt-3 p-2">
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
