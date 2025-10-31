"use client";

import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("google_jwt_token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setUser({
          id: decoded.sub,
          name: decoded.name,
          picture: decoded.picture,
        });
      } catch (error) {
        console.error("Invalid token in localStorage:", error);
        localStorage.removeItem("google_jwt_token");
      }
    }
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("google_jwt_token");
      setUser(null);
      return;
    }

    try {
      localStorage.setItem("google_jwt_token", token);
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        picture: decoded.picture,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUser(null);
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken, user, setUser }}>{children}</AuthContext.Provider>;
}
