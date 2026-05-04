import axios from "axios";

// Detect if running on Vercel production domain
const isVercel =
  import.meta.env.MODE === "production" &&
  typeof window !== "undefined" &&
  window.location.hostname.includes("vercel.app");

const api = axios.create({
  baseURL: isVercel
    ? "https://fitnessprogressor-backend.onrender.com"
    : import.meta.env.VITE_API_BASE_URL,
});

export default api;
