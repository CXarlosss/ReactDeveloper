import { createContext } from 'react';

interface User {
  userId: string;
  username: string;
  // Añade aquí otros campos del usuario si los tienes
}

interface UserData {
  user: User;
  isAdmin: boolean;
}

export interface AuthContextType { // Exportamos la interfaz
  user: User | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {}, // evitamos el warning
  logout: () => {},
  isAdmin: false,
});


export default AuthContext;