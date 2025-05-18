import{ useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext'; // usa el contexto creado

interface User {
  userId: string;
  username: string;
}

interface UserData {
  user: User;
  isAdmin: boolean;
}

interface AuthProviderProps {
  children?: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const simulatedUser: User = { userId: 'someId', username: 'testUser' };
      setUser(simulatedUser);
      setIsAdmin(false);
    }
  }, []);

  const login = (_token: string, userData: UserData) => {
    localStorage.setItem('authToken', _token);
    setUser(userData.user);
    setIsAdmin(userData.isAdmin);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
