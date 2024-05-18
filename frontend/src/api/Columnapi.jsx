import { todosApi } from "./todoServerApi";

export const todosUrlEndpoint = "/column";

export const getColumnOrder = async (params) => {
  const [todosUrlEndpoint, headers] = params;
  const response = await todosApi.get(todosUrlEndpoint + "/Order", {
    params: {
      username: headers.username,
    },
  });
  return response.data;
};

export const getColumns = async (params) => {
  const [headers] = params;
  const response = await todosApi.get(todosUrlEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      username: headers.username,
      token: headers.token,
      // sessionId: sessionId,
    },
  });
  return response.data;
};

export const storeColumn = (user, column, colour, currCol, token) => {
  const response = todosApi.post(todosUrlEndpoint, {
    username: user,
    column,
    colour,
    currCol,
    token,
  });
  return response;
};
export const updateColumn = async (
  username,
  oldColumn,
  colour,
  newColumn,
  token
) => {
  const response = await todosApi.put(todosUrlEndpoint, {
    username,
    oldColumn,
    colour,
    newColumn,
    token,
  });
  return response.data;
};
export const updateColumnOrder = async (
  username,
  srcIndex,
  destIndex,
  token
) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Order", {
    username,
    srcIndex,
    destIndex,
    token,
  });
  return response.data;
};
export const removeColumn = (username, column, token) => {
  const response = todosApi.delete(todosUrlEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      column,
      token,
    },
  });
  return response;
};
