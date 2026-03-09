import axios from "axios";

const API = axios.create({
  baseURL: "https://gharpayy-backend.vercel.app/api"
});

export default API;