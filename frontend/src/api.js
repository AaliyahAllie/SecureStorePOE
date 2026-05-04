import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://localhost:5001/api",
  withCredentials: true,
});

export default API;