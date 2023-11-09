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
export const updateTodo = async (username, column, todo, newTodo) => {
  const response = await todosApi.put(todosUrlEndpoint, {
    username,
    column,
    todo,
    newTodo,
  });
  return response.data;
};
export const updateTodoOrder = async (
  username,
  oldColumn,
  srcIndex,
  destIndex,
  newColumn
) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Order", {
    username,
    oldColumn,
    srcIndex,
    destIndex,
    newColumn,
  });
  console.log(response);
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
