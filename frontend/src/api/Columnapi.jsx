import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});
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
      // sessionId: sessionId,
    },
  });
  return response.data;
};

export const storeColumn = (user, column) => {
  const response = todosApi.post(todosUrlEndpoint, {
    username: user,
    column,
  });
  return response.data;
};
export const updateColumn = async (username, oldColumn, newColumn) => {
  const response = await todosApi.put(todosUrlEndpoint, {
    username,
    oldColumn,
    newColumn,
  });
  return response.data;
};
export const updateColumnOrder = async (username, srcIndex, destIndex) => {
  const response = await todosApi.put(todosUrlEndpoint + "/Order", {
    username,
    srcIndex,
    destIndex,
  });
  return response.data;
};
export const removeColumn = (username, column) => {
  const response = todosApi.delete(todosUrlEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      column,
    },
  });
  return response.data;
};
