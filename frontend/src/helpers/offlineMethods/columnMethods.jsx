import { todosApi } from "../../api/todoServerApi";
import { setItemInLocal } from "./localInterface";
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

export const offAddCol = (newColumn, currCol, colour, columns) => {
  columns.columnOrder.splice(currCol, 0, newColumn);
  columns[newColumn] = { todos: [], colour: colour };
  setItemInLocal("todos", columns);
};

export const offDelCol = (column, columns) => {
  columns.columnOrder = columns.columnOrder.filter((col) => col !== column);
  delete columns[column];
  setItemInLocal("todos", columns);
};
export const offUpdateCol = (column, colour, newColumn, columns) => {
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
  setItemInLocal("todos", columns);
};

export const offUpdateColOrder = (srcIndex, destIndex, columns) => {
  const newColumnOrder = Array.from(columns.columnOrder);
  const temp = newColumnOrder[srcIndex];
  newColumnOrder.splice(srcIndex, 1);
  newColumnOrder.splice(destIndex, 0, temp);
  columns.columnOrder = newColumnOrder;
  setItemInLocal("todos", columns);
};
export class offlineColMethods {}
