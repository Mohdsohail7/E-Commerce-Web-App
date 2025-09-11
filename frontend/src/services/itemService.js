import axiosInstance from "../api/axios";

export function getItems(params) {
  return axiosInstance.get("/items", { params }).then((r) => r.data);
}

export function getItemById(id) {
  return axiosInstance.get(`/items/${id}`).then((r) => r.data);
}

export const createItem = async (itemData) => {
  const res = await axiosInstance.post("/items", itemData);
  return res.data;
};

export const updateItem = async (id, itemData) => {
  const res = await axiosInstance.put(`/items/${id}`, itemData);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axiosInstance.delete(`/items/${id}`);
  return res.data;
};
