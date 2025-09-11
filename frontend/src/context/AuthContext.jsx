import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance, { setAuthToken } from "../api/axios";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (token) {
          setAuthToken(token);
          const res = await axiosInstance.get("/auth/me");
          setUser(res.data);
        }
      } catch (err) {
        console.error("Auth init error", err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    initialize();
    // eslint-disable-next-line
  }, []);

  const register = async (payload) => {
    const res = await axiosInstance.post("/auth/register", payload);
    const t = res.data.token;
    localStorage.setItem("token", t);
    setAuthToken(t);
    setToken(t);
    setUser(res.data.user);
    return res.data;
  };

  const login = async (payload) => {
    const res = await axiosInstance.post("/auth/login", payload);
    const t = res.data.token;
    localStorage.setItem("token", t);
    setAuthToken(t);
    setToken(t);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.isAdmin === true;

  const value = { user, token, isAdmin, register, login, logout, loading, redirectAfterLogin, setRedirectAfterLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
