import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // User object with profile information

  const login = () => {
    // Perform login logic, set isLoggedIn to true, and setUser with user data
    setIsLoggedIn(true);
    setUser(/* User data */);
  };

  const logout = () => {
    // Perform logout logic, set isLoggedIn to false, and setUser to null
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children} {/* Ensure that children are properly passed here */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
