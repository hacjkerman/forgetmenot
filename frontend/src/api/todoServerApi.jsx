import axios from "axios";

export const todosApi = axios.create({
  baseURL: process.env.REACT_APP_TODOSERVER,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "*",
  },
});
