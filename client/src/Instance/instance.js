import axios from "axios";

// Define the baseURL for your API
const baseURL = "https://wildlens-backend-cm9t.onrender.com/api";

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': "application/json",
  },
});

const protectedInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': "application/json",
  },
  withCredentials: true,
});

export { instance, protectedInstance };
