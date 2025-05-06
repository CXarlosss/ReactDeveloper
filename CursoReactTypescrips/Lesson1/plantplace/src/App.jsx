// @ts-nocheck
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
    }
  }, [isAuthenticated]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    console.log("Aumentar cantidad:", id); // <== PRUEBA
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    console.log("Disminuir cantidad:", id); // <== PRUEBA
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        cartItems={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeFromCart={removeFromCart}
      />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cartItems={cart} />
} />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
