import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import type { AuthContextType } from '../context/AuthContext'; // 👈 esta es la corrección

export const useAuth = () => useContext(AuthContext) as AuthContextType;
