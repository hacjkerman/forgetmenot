import axios from "axios";

const todosApi = axios.create({
  baseURL: process.env.REACT_APP_COLUMN_ADDRESS,
});
export const todosUrlEndpoint = "/column";

export const fetcher = async (params) => {
  const [url, headers] = params;
  const response = await todosApi.get(url, {
    params: {
      username: headers.username,
    },
  });
  return response.data;
};

// export const getColumns = (username) => {
//   const response = todosApi.get(username, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     params: {
//       username: username,
//       // sessionId: sessionId,
//     },
//   });
//   return response.data;
// };

export const storeColumn = (username, column) => {
  const response = todosApi.post("http://localhost:8080/column", {
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
export const removeColumn = (username, column) => {
  const response = todosApi.delete("http://localhost:8080/column", {
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
