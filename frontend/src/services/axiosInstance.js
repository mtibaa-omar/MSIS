import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_URL;
// Base Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
