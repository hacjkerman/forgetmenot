import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const todosApi = axios.create({
  baseURL: process.env.REACT_APP_TODOSERVER,
});
