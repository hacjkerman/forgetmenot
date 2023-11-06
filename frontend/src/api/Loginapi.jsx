import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const login = async (username, password) => {
  const response = await todosApi.post("/login", {
    username,
    password,
  });
  return response.data;
};

export const signUp = async (username, email, password) => {
  const response = await todosApi.post("/register", {
    username,
    email,
    password,
  });
  return response.data;
};
