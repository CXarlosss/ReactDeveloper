import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/Layout";
import IndexPage from "./views/IndexPage";
import FavoritesPage from "./views/FavoritesPage";
import GenerateAI from "./views/GenerateAI.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/generate" element={<GenerateAI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
