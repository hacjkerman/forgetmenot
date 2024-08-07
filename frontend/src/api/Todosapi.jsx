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

export const storeTodo = async (
  username,
  column,
  todo,
  estimate,
  dueDate,
  colour,
  token
) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
    column,
    todo,
    estimate,
    dueDate,
    colour,
    token,
  });
  return response.data;
};
export const updateTodo = async (
  username,
  column,
  todo,
  newTodo,
  newColour,
  token
) => {
  console.log(column, todo, newTodo);
  const response = await todosApi.put(todosUrlEndpoint, {
    username,
    column,
    todo,
    newTodo,
    newColour,
    token,
  });
  console.log(response);
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

export const updateTodoEstimate = async (
  username,
  column,
  todoId,
  newEstimate,
  token
) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Estimate", {
    username,
    column,
    todoId,
    newEstimate,
    token,
  });
  console.log(response);
  return response;
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
  return response;
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
  return response;
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
