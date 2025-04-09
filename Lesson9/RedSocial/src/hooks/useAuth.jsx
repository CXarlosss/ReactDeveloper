import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, logout, loading } = useContext(AuthContext);
  return {
    user,
    logout,
    loading,
    isAuthenticated: !!user,
  };
};
