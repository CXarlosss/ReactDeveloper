import React from "react";

export const ProductCard = ({
  card,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  favorites = [],
  cartItems = [],
  isFavoriteView
}) => {
  const { name, image_uris, rarity, id } = card;
  const imageUrl = image_uris?.normal || "https://via.placeholder.com/300x420?text=No+Image";

  const isFav = favorites.some((fav) => fav.id === id);
  const isInCart = cartItems.some((item) => item.id === id);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center dark:bg-gray-800 dark:text-white transition">
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

      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{rarity}</p>

        {isFavoriteView ? (
          <button
            onClick={() => removeFromFavorites(id)}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Quitar de favoritos
          </button>
        ) : (
          <>
            <button
              disabled={isFav}
              onClick={() => addToFavorites(card)}
              className={`mt-4 px-4 py-2 rounded-md w-full transition ${
                isFav
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isFav ? "Ya en favoritos" : "Añadir a favoritos"}
            </button>

            <button
              disabled={isInCart}
              onClick={() => addToCart(card)}
              className={`mt-2 px-4 py-2 rounded-md w-full transition ${
                isInCart
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isInCart ? "Ya en carrito" : "Añadir al carrito"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
