import axios from "axios";

const endpoint = "http://localhost:3000/api";

const http = axios.create({
  baseURL: endpoint,
  withCredentials: true,
});

export default http;
