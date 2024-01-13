import axios from "axios";

const http = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default http;