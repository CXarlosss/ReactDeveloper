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
          {favorites.map((card) => {
            const imageUrl = card.image_uris?.normal || "https://via.placeholder.com/300x420?text=No+Image";

            return (
              <div key={card.id} className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden">
                {/* Imagen con fondo difuminado */}
                <div className="relative w-full h-72 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                  <img
                    src={imageUrl}
                    alt={card.name}
                    className="relative z-10 w-full h-full object-contain p-4"
                  />
                </div>

                {/* Detalles */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{card.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{card.rarity}</p>
                  <button
                    onClick={() => removeFromFavorites(card.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Quitar de favoritos
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
