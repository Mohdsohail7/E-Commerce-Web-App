import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ItemCard({ item }) {
  const { addItem } = useCart();
  const { user, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      // agar login nahi hai
      setRedirectAfterLogin({ action: "addToCart", product: item });
      navigate("/login");
    } else {
      addItem(item, 1);
    }
  };

  return (
    <div className="border rounded p-4 flex flex-col">
      <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">
        <img
          src={item.image || "https://via.placeholder.com/200"}
          alt={item.name}
          className="max-h-full"
        />
      </div>
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600 flex-1">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">₹{item.price}</div>
        <button
          onClick={handleAddToCart}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
