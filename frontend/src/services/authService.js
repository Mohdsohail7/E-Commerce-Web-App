import axiosInstance, { setAuthToken } from "../api/axios";

export async function register(payload) {
  const res = await axiosInstance.post("/auth/register", payload);
  if (res.data && res.data.token) setAuthToken(res.data.token);
  return res.data;
}

export async function login(payload) {
  const res = await axiosInstance.post("/auth/login", payload);
  if (res.data && res.data.token) setAuthToken(res.data.token);
  return res.data;
}

export async function me() {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
}
