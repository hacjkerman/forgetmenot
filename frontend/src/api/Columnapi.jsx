import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8080",
});
export const todosUrlEndpoint = "/column/Order";

export const getColumns = async (params) => {
  const [todosUrlEndpoint, headers] = params;
  const response = await todosApi.get(todosUrlEndpoint, {
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
  const response = await todosApi.put(todosUrlEndpoint, {
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
