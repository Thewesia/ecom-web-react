import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Load user + login state from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoginState = localStorage.getItem("isLoggedIn");

    if (storedUser && storedLoginState === "true") {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Signup (prevent duplicate email)
  const signup = (email, password) => {
    setAuthError(null);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setAuthError("Email already registered");
        return { success: false, message: "Email already registered" };
      }
    }

    const newUser = { email, password };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");
    return { success: true, message: "Signup successful" };
  };

  // Login (check credentials against localStorage)
  const login = (email, password) => {
    setAuthError(null);

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setAuthError("No account found. Please sign up first.");
      return {
        success: false,
        message: "No account found. Please sign up first.",
      };
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      setUser(parsedUser);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      return { success: true, message: "Login successful" };
    } else {
      setAuthError("Invalid email or password");
      return { success: false, message: "Invalid email or password" };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setAuthError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoggedIn, authError, signup, login, logout } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);
