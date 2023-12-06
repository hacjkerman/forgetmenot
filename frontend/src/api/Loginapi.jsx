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

export const logout = async (username, token) => {
  const response = await todosApi.delete("/logout", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      token,
    },
  });
  return response.data;
};

export const getEmail = async (username, token) => {
  const response = await todosApi.get("/email", {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      username,
      token,
    },
  });
  return response.data;
};

export const updateEmail = async (username, email, token) => {
  const response = await todosApi.update("/updateEmail", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      email,
      token,
    },
  });
  return response.data;
};

export const updatePhone = async (username, phone, token) => {
  const response = await todosApi.update("/updatePhone", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      phone,
      token,
    },
  });
  return response.data;
};

export const removeUser = async (username, password, token) => {
  const response = await todosApi.delete("/removeUser", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      password,
      token,
    },
  });
  return response.data;
};
