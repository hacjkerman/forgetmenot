import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const todosUrlEndpoint = "/todo";

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

export const storeTodo = async (username, column, todo, dueDate, token) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
    dueDate,
    token,
  });
  return response.data;
};
export const updateTodo = async (username, column, todo, newTodo, token) => {
  const response = await todosApi.put(todosUrlEndpoint, {
    username,
    column,
    todo,
    newTodo,
    token,
  });
  return response.data;
};
export const updateTodoOrder = async (
  username,
  oldColumn,
  srcIndex,
  destIndex,
  newColumn,
  token
) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Order", {
    username,
    oldColumn,
    srcIndex,
    destIndex,
    newColumn,
    token,
  });
  console.log(response);
  return response.data;
};

export const updateTodoDate = async (
  username,
  column,
  todo,
  newDate,
  token
) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Date", {
    username,
    column,
    todo,
    newDate,
    token,
  });
  return response.data;
};

export const removeTodo = async (username, column, todoId, token) => {
  const response = await todosApi.delete(todosUrlEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      column,
      todoId,
      token,
    },
  });
  return response.data;
};
