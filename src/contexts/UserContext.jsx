"use client";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { decodeToken } from "react-jwt";

export const UserContext = createContext(null);

export default function UserProvider(props) {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const jwt_token = window.localStorage.getItem("token");
        if (jwt_token) {
          setToken(jwt_token);
          setIsLoggedIn(true);
          const decoded_user = decodeToken(jwt_token);
          setUser(decoded_user);
        }
      } catch (e) {
        console.error("Auth initialization error", e);
      }
    };

    if (typeof window !== 'undefined') {
      initializeAuth();
    }
  }, []);

  const login = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", token);
    }
    setToken(token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
    }
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ token, isLoggedIn, login, logout, user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }
  return userContext;
};
