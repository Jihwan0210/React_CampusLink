import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { id: string } | null;
  login: (id: string, pw: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const VALID_ID = 'admin';
const VALID_PW = '1234';
const SESSION_KEY = 'campuslink_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string } | null>(() => {
    try { const s = sessionStorage.getItem(SESSION_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
  });

  const login = (id: string, pw: string): boolean => {
    if (id === VALID_ID && pw === VALID_PW) {
      const u = { id };
      setUser(u);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => { setUser(null); sessionStorage.removeItem(SESSION_KEY); };

  return (
    <AuthContext.Provider value={{ isLoggedIn: user !== null, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
