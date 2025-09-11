import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import * as cartService from "../services/cartService";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const LOCAL_KEY = "cart_local_v1";

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  });

  const saveLocal = (arr) => {
    setItems(arr);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  };

  useEffect(() => {
    const sync = async () => {
      if (user) {
        const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
        for (const it of local) {
          try {
            await cartService.addToCart(
              it.item._id || it.item.id || it.item,
              it.quantity
            );
          } catch (err) {}
        }
        try {
          const res = await cartService.getCart();
          saveLocal(
            res.items.map((i) => ({ item: i.item, quantity: i.quantity }))
          );
        } catch (err) {
          console.error("Failed to load server cart", err);
        }
      } else {
        const raw = localStorage.getItem(LOCAL_KEY) || "[]";
        setItems(JSON.parse(raw));
      }
    };
    sync();
  }, [user]);

  const addItem = async (product, quantity = 1) => {
    if (user) {
      try {
        await cartService.addToCart(product._id || product.id, quantity);
        const res = await cartService.getCart();
        saveLocal(
          res.items.map((i) => ({ item: i.item, quantity: i.quantity }))
        );
        return;
      } catch (err) {
        console.error("Add to server cart failed", err);
      }
    }
    const idx = items.findIndex(
      (i) => (i.item._id || i.item.id) === (product._id || product.id)
    );
    const next = [...items];
    if (idx > -1) next[idx].quantity += quantity;
    else next.push({ item: product, quantity });
    saveLocal(next);
  };

  const updateItem = async (productId, quantity) => {
    if (user) {
      try {
        await cartService.updateCartItem(productId, quantity);
        const res = await cartService.getCart();
        saveLocal(
          res.items.map((i) => ({ item: i.item, quantity: i.quantity }))
        );
        return;
      } catch (err) {
        console.error(err);
      }
    }
    const next = items
      .map((i) => ({
        ...i,
        quantity:
          (i.item._id || i.item.id) === productId ? quantity : i.quantity,
      }))
      .filter((i) => i.quantity > 0);
    saveLocal(next);
  };

  const removeItem = async (productId) => {
    if (user) {
      try {
        await cartService.removeFromCart(productId);
        const res = await cartService.getCart();
        saveLocal(
          res.items.map((i) => ({ item: i.item, quantity: i.quantity }))
        );
        return;
      } catch (err) {
        console.error(err);
      }
    }
    const next = items.filter((i) => (i.item._id || i.item.id) !== productId);
    saveLocal(next);
  };

  const clearCart = async () => {
    if (user) {
      try {
        await cartService.clearCart();
      } catch (err) {
        console.error(err);
      }
    }
    saveLocal([]);
  };

  const total = items.reduce(
    (acc, it) => acc + (it.item.price || 0) * it.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateItem, removeItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
