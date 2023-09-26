import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const todosUrlEndpoint = "/todos";

export const getTodos = async (username, sessionId) => {
  const response = await todosApi.get(todosUrlEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      username: username,
      sessionId: sessionId,
    },
  });
  return response.data;
};
export const storeTodo = async (username, sessionId, todo, dueDate) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    sessionId,
    todo,
    dueDate,
  });
  return response.data;
};
export const updateTodo = async (username, sessionId, todo, newTodo) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    sessionId,
    todo,
    newTodo,
  });
  return response.data;
};
export const removeTodo = async (username, sessionId, todo) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    sessionId,
    todo,
  });
  return response.data;
};
