import axiosInstance from "../api/axios";

export function getCart() {
  return axiosInstance.get("/cart").then((r) => r.data);
}

export function addToCart(itemId, quantity = 1) {
  return axiosInstance.post("/cart", { itemId, quantity }).then((r) => r.data);
}

export function updateCartItem(itemId, quantity) {
  return axiosInstance.put("/cart", { itemId, quantity }).then((r) => r.data);
}

export function removeFromCart(itemId) {
  return axiosInstance.delete(`/cart/${itemId}`).then((r) => r.data);
}

export function clearCart() {
  return axiosInstance.delete("/cart").then((r) => r.data);
}
