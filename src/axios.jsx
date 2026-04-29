import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-hosting-server.onrender.com/api",
});
delete API.defaults.headers.common["Authorization"];
export default API;
