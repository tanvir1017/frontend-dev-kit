import { useEffect, useState } from "react";

/**
 * For example purpose
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate auth check (replace with real logic)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

/**
 * How it an be used in components
 *
 *  */
// components/layout/Navbar.tsx
//const { isAuthenticated } = useAuth()
