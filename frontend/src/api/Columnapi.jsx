import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});

export const todosUrlEndpoint = "/column";

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
export const storeColumn = async (username, column) => {
  const response = await todosApi.post(todosUrlEndpoint, {
    username,
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
export const removeColumn = async (username, column) => {
  const response = await todosApi.delete(todosUrlEndpoint, {
    username,
    column,
  });
  return response.data;
};
