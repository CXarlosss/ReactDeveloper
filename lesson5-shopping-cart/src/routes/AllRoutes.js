
// @ts-nocheck
import { Routes, Route } from "react-router-dom";
import { Home, Favorites } from "../pages";

export const AllRoutes = ({ cards, favorites, addToFavorites, removeFromFavorites }) => (
  <Routes>
    <Route
      path="/"
      element={<Home cards={cards} addToFavorites={addToFavorites} />}
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
  </Routes>
);
