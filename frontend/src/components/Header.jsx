import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow">
      <div className="container-max py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Shop
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/">Products</Link>
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-2 bg-blue-600 text-white px-2 rounded-full text-xs">
              {items.length}
            </span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user.name}</span>
              <button onClick={onLogout} className="text-sm text-red-600">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">Login</Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
