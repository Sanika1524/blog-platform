import axios from "axios";
export * from './posts';
export * from './comments';

const api = axios.create({
  baseURL: "http://localhost:3001", // Your JSON Server or backend
  headers: { "Content-Type": "application/json" }
});

export default api;
