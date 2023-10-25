import axios from "axios";

const todosApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
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

export const todoFetcher = async (params) => {
  const [url, headers] = params;
  const response = await todosApi.get(url, {
    params: {
      username: headers.username,
      column: headers.column,
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
  const response = await todosApi.put(todosUrlEndpoint, {
    username,
    column,
    todo,
    newTodo,
  });
  return response.data;
};
export const updateTodoColumn = async (username, todo, newColumn) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Column", {
    username,
    todo,
    newColumn,
  });
  return response.data;
};
export const updateTodoDate = async (username, column, todo, newDate) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Date", {
    username,
    column,
    todo,
    newDate,
  });
  return response.data;
};
export const removeTodo = async (username, column, todo) => {
  const response = await todosApi.delete(todosUrlEndpoint, {
    username,
    column,
    todo,
  });
  return response.data;
};
