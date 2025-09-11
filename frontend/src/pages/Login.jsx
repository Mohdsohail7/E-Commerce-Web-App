import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await login({ email, password });

      if (redirectAfterLogin) {
        if (redirectAfterLogin.action === "addToCart") {
          await addItem(redirectAfterLogin.product, 1);
          navigate("/cart");  // go to cart page directly
        } else {
          navigate("/"); // fallback
        }
        setRedirectAfterLogin(null);
      } else {
        navigate("/"); // normal login -> go home
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="container-max py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full px-3 py-2 border rounded"
          />
          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
