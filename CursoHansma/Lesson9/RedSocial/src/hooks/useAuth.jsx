// ❗ Solo si decides separar el hook en otro archivo
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de exportarlo

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  const { user, logout, loading } = context;

  return {
    user,
    logout,
    loading,
    isAuthenticated: !!user,
  };
};
