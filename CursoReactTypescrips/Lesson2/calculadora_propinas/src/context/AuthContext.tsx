import { createContext, useContext, useState, type ReactNode } from "react";
import type { OrderItem } from "../types";

interface AuthContextType {
  username: string;
  login: (name: string) => void;
  logout: () => void;
  history: OrderItem[][];
  saveOrderToHistory: (order: OrderItem[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>("");
  const [history, setHistory] = useState<OrderItem[][]>([]);

  const login = (name: string) => {
    setUsername(name);
    setHistory([]); // Reset historial por usuario
  };

  const logout = () => {
    setUsername("");
    setHistory([]);
  };

  const saveOrderToHistory = (order: OrderItem[]) => {
    setHistory((prev) => [...prev, order]);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout, history, saveOrderToHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
