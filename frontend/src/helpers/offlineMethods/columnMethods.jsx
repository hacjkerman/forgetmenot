import { todosApi } from "../../api/todoServerApi";
export const validConnection = async () => {
  try {
    const res = await getAny();
    console.log(res);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getAny = async () => {
  const response = await todosApi.get("/", {});
  return response;
};

export const offAddCol = async (newColumn, currCol, colour, columns) => {
  console.log(currCol);
  columns.columnOrder.splice(currCol, 0, newColumn);
  columns[newColumn] = { todos: [], colour: colour };
  localStorage.setItem("todos", JSON.stringify(columns));
  console.log(JSON.parse(localStorage.getItem("todos")));
};
