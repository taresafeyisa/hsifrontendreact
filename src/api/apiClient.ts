import axios from "axios";
import { API_URL } from "./endpoints";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// You can add interceptors here if needed

export default apiClient;
