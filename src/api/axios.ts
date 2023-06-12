import axios from "axios";

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const nextApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export function setAuthHeader(token: string) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function clearAuthHeader() {
  delete api.defaults.headers.Authorization;
}
