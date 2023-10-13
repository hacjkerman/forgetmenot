import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const todosUrlEndpoint = "/columns";

export const getColumns = async (username) => {
  const response = await todosApi.get(todosUrlEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      username: username,
      // sessionId: sessionId,
    },
  });
  return response.data;
};
// TODO edit functions
export const storeColumn = async (username, column, todo, dueDate) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
    dueDate,
  });
  return response.data;
};
// TODO edit functions
export const updateColumm = async (username, column, todo, newTodo) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
    newTodo,
  });
  return response.data;
};
// TODO edit functions
export const removeColumn = async (username, column, todo) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
  });
  return response.data;
};
