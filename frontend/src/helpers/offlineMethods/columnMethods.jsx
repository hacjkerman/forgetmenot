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

export const offDelCol = async (column, columns) => {
  console.log(column);
  columns.columnOrder = columns.columnOrder.filter((col) => col !== column);
  delete columns[column];
  console.log(columns);
  localStorage.setItem("todos", JSON.stringify(columns));
};
export const offUpdateCol = async (column, colour, newColumn, columns) => {
  const currCol = columns[column];
  // UPDATES COLUMN TO NEW FORMAT
  columns[newColumn] = {
    todos: currCol.todos,
    colour: colour,
  };
  if (column !== newColumn) {
    let colOrder = columns.columnOrder;
    const index = colOrder.findIndex((item) => item === column);
    colOrder.splice(index, 1);
    colOrder.splice(index, 0, newColumn);
  }
  localStorage.setItem("todos", JSON.stringify(columns));
};

export const offUpdateColOrder = async (srcIndex, destIndex, columns) => {
  const newColumnOrder = Array.from(columns.columnOrder);
  const temp = newColumnOrder[srcIndex];
  newColumnOrder.splice(srcIndex, 1);
  newColumnOrder.splice(destIndex, 0, temp);
  columns.columnOrder = newColumnOrder;
  localStorage.setItem("todos", JSON.stringify(columns));
};
export class offlineColMethods {}
