import axiosInstance from "../api/axios";

export function getItems(params) {
  return axiosInstance.get("/items", { params }).then((r) => r.data);
}

export function getItemById(id) {
  return axiosInstance.get(`/items/${id}`).then((r) => r.data);
}
