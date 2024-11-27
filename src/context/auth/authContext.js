import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext(undefined);

// AuthProvider component to provide authentication state and methods
export const AuthProvider = ({ children }) => {
  // Initialize state with user data from localStorage (if it exists)

  const history = useHistory();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    history.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    history.push("/");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in your components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
