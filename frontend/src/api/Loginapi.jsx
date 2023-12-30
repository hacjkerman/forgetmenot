import axios from "axios";

const todosApi = axios.create({
  baseURL: process.env.REACT_APP_AUTHSERVER,
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

export const updateUser = async (username, token) => {
  const response = await todosApi.put("/updateUser", {
    username,
    token,
  });
  return response.data;
};

export const getEmail = async (username, token) => {
  const response = await todosApi.get("/email", {
    params: {
      username,
      token,
    },
  });
  return response.data;
};

export const updateEmail = async (username, email, token) => {
  const response = await todosApi.put("/updateEmail", {
    username,
    email,
    token,
  });
  return response.data;
};

export const getProfile = async (params) => {
  const [headers] = params;
  const response = await todosApi.get("/userProfile", {
    params: {
      username: headers.username,
      token: headers.token,
    },
  });
  return response.data;
};

export const getPhone = async (username, token) => {
  const response = await todosApi.get("/phone", {
    params: {
      username,
      token,
    },
  });
  return response.data;
};

export const updatePhone = async (username, phone, token) => {
  const response = await todosApi.put("/updatePhone", {
    username,
    phone,
    token,
  });
  return response.data;
};

export const removeUser = async (username, password, token) => {
  const response = await todosApi.delete("/removeUser", {
    headers: {
      "Content-Type": "application/json",
    },
    data: { username, password, token },
  });
  return response.data;
};
