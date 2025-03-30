// @ts-nocheck
import { Routes, Route } from "react-router-dom";
import { Home, Favorites, Cart } from "../pages";

export const AllRoutes = ({
  cards,
  favorites,
  cartItems,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart
}) => (
  <Routes>
    <Route
      path="/"
      element={
        <Home
          cards={cards}
          favorites={favorites}
          cartItems={cartItems}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
        />
      }
    />
    <Route
      path="/favorites"
      element={
        <Favorites
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
        />
      }
    />
   <Route
  path="/cart"
  element={
    <Cart
      cartItems={cartItems}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  }
/>

  </Routes>
);
