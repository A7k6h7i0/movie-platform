import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("loggedInUser");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("loggedInUser");
      }
    }
    
    // ✅ CRITICAL FIX: Set authLoading to false AFTER the check completes
    setAuthLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
