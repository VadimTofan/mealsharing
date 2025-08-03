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
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setUser({
          id: decoded.sub,
          name: decoded.name,
          picture: decoded.picture,
        });
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("google_jwt_token", token);
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.sub,
          name: decoded.name,
          picture: decoded.picture,
        });
      } catch (e) {
        setUser(null);
      }
    } else {
      localStorage.removeItem("google_jwt_token");
      setUser(null);
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken, user, setUser }}>{children}</AuthContext.Provider>;
}
