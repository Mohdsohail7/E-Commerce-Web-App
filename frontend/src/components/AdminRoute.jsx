import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!user) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    // logged in but not admin
    return <Navigate to="/" replace />;
  }

  // logged in & admin
  return children;
}
