export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://devtinder-backend-78u4.onrender.com";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
