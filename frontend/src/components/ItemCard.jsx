import React from "react";
import { useCart } from "../context/CartContext";

export default function ItemCard({ item }) {
  const { addItem } = useCart();

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
          onClick={() => addItem(item, 1)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
