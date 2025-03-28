// @ts-nocheck
import React from "react";

export const ProductCard = ({ card, addToFavorites }) => {
  const { name, image_uris, rarity } = card;
  const imageUrl = image_uris?.normal || "https://via.placeholder.com/300x420?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center dark:bg-gray-800 dark:text-white transition">
      {/* Fondo difuminado con imagen y carta encima */}
      <div className="relative w-full h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <img
          src={imageUrl}
          alt={name}
          className="relative z-10 w-full h-full object-contain p-4"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{rarity}</p>
        <button
          onClick={() => addToFavorites(card)}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Añadir a favoritos
        </button>
      </div>
    </div>
  );
};
