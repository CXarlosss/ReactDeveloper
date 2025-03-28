// src/pages/Favorites.js
import React from "react";

export const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">⭐ Tus Cartas Favoritas</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No has añadido ninguna carta a favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((card) => (
            <div key={card.id} className="bg-white dark:bg-gray-800 shadow rounded p-4">
              <img src={card.imageUrl} alt={card.name} className="w-full h-52 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{card.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{card.rarity}</p>
              <button
                onClick={() => removeFromFavorites(card.id)}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
