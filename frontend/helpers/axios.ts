import axios from "axios";

const baseUrl = process.env.BACKEND_URL;
let headers = {};

if (typeof window !== "undefined") {
  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers,
});

export default axiosInstance;
