// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Header } from "./components";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Obtener cartas desde la API de Scryfall
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://api.scryfall.com/cards/search?q=cmc<=2");
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error("Error al obtener las cartas:", error);
      }
    };

    fetchCards();
  }, []);

  // Guardar favoritos y carrito en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // === Favoritos ===
  const addToFavorites = (card) => {
    if (!favorites.find((fav) => fav.id === card.id)) {
      setFavorites([...favorites, card]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  // === Carrito ===
  const addToCart = (card) => {
    if (!cartItems.find((item) => item.id === card.id)) {
      setCartItems([...cartItems, card]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <Header
        favoritesCount={favorites.length}
        cartCount={cartItems.length}
      />
      <AllRoutes
        cards={cards}
        favorites={favorites}
        cartItems={cartItems}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
