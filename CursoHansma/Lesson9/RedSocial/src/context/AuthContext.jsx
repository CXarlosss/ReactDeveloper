// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Provider que envuelve la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Usuario actual
  const [loading, setLoading] = useState(true);   // Estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Limpieza al desmontar
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children} {/* Solo renderiza hijos cuando ha cargado */}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para consumir contexto
export const useAuth = () => {
  const { user, logout, loading } = useContext(AuthContext);
  return {
    user,
    logout,
    loading,
    isAuthenticated: !!user, // true si hay usuario
  };
};
