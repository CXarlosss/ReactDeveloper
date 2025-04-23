// @ts-nocheck
import React, { useState } from "react";
import { ProductCard } from "../components/ProductCard";

export const Home = ({ cards, favorites, cartItems, addToFavorites, addToCart }) => {
  const [selectedRarity, setSelectedRarity] = useState("all");

  const rarities = ["all", "common", "uncommon", "rare", "mythic"];

  const filteredCards =
    selectedRarity === "all"
      ? cards
      : cards.filter((card) => card.rarity?.toLowerCase() === selectedRarity);

  return (
    <main className="p-6">
      {/* Filtro de rareza */}
      <div className="mb-6 flex flex-wrap gap-2">
        {rarities.map((rarity) => (
          <button
            key={rarity}
            onClick={() => setSelectedRarity(rarity)}
            className={`px-4 py-2 rounded-md border ${
              selectedRarity === rarity
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
          >
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </button>
        ))}
      </div>

      {/* Cartas filtradas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <ProductCard
            key={card.id}
            card={card}
            favorites={favorites}
            cartItems={cartItems}
            addToFavorites={addToFavorites}
            addToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
};
