import axios from "axios";
export const todosApi = axios.create({
  baseURL: process.env.REACT_APP_TODOSERVER,
});
