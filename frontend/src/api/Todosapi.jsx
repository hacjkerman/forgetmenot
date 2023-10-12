import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const todosUrlEndpoint = "/todos";

export const getTodos = async (username) => {
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
export const storeTodo = async (username, column, todo, dueDate) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
    dueDate,
  });
  return response.data;
};
export const updateTodo = async (username, column, todo, newTodo) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
    newTodo,
  });
  return response.data;
};
export const removeTodo = async (username, column, todo) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
  });
  return response.data;
};
