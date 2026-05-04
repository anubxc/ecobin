import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ecobin_user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('ecobin_token'));

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('ecobin_user', JSON.stringify(userData));
    localStorage.setItem('ecobin_token', jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ecobin_user');
    localStorage.removeItem('ecobin_token');
  };

  const updateBalance = (newBalance) => {
    const updated = { ...user, tokenBalance: newBalance };
    setUser(updated);
    localStorage.setItem('ecobin_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
