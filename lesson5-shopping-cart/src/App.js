// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Header } from "./components";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Función para obtener las cartas desde la API de Scryfall
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://api.scryfall.com/cards/search?q=cmc<=2");
        const data = await response.json();
        setCards(data.data); // 'data.data' contiene el array de cartas
      } catch (error) {
        console.error("Error al obtener las cartas:", error);
      }
    };

    fetchCards();
  }, []);

  // Funciones para manejar favoritos
  const addToFavorites = (card) => {
    if (!favorites.find((fav) => fav.id === card.id)) {
      setFavorites([...favorites, card]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  return (
    <div className="App">
      <Header favoritesCount={favorites.length} />
      <AllRoutes
        cards={cards}
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
    </div>
  );
}

export default App;
