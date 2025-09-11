import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, updateItem, removeItem, clearCart, total } = useCart();

  return (
    <main className="container-max py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="p-6 bg-white rounded shadow text-center">
          Your cart is empty
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {items.map((i) => (
                <div
                  key={i.item._id || i.item.id}
                  className="flex items-center gap-4 bg-white p-4 rounded shadow"
                >
                  <img
                    src={i.item.image || "https://via.placeholder.com/100"}
                    alt={i.item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{i.item.name}</div>
                    <div className="text-sm text-gray-600">₹{i.item.price}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateItem(i.item._id || i.item.id, i.quantity - 1)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <div>{i.quantity}</div>
                      <button
                        onClick={() =>
                          updateItem(i.item._id || i.item.id, i.quantity + 1)
                        }
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(i.item._id || i.item.id)}
                        className="ml-4 text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white p-4 rounded shadow">
            <div className="text-lg font-semibold">Order summary</div>
            <div className="mt-4">
              Items total: <strong>₹{total}</strong>
            </div>
            <button
              onClick={() => alert("Checkout not implemented")}
              className="mt-4 w-full px-3 py-2 bg-green-600 text-white rounded"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="mt-2 w-full px-3 py-2 border rounded"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
