import { todosApi } from "./todoServerApi";

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

export const updateTodoDone = async (username, column, todo, token) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Done", {
    username,
    column,
    todo,
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
  return response.data;
};

export const updateTodoDate = async (
  username,
  column,
  todoId,
  newDate,
  token
) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Date", {
    username,
    column,
    todoId,
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
