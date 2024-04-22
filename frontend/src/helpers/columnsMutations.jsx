import {
  storeColumn,
  updateColumn,
  removeColumn,
  updateColumnOrder,
} from "../api/Columnapi.jsx";
import { toast } from "react-hot-toast";

export const addColMutation = async (user, newColumn, token, columns) => {
  const added = await storeColumn(user, newColumn, token);
  if (added.status) {
    toast.success(added.status + " Successfully added column: " + newColumn);
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    return false;
  }
};

export const addColOptions = (newColumn, columns) => {
  columns.columnOrder.push(newColumn);
  columns[newColumn] = [];
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const delColMutation = async (user, column, columns, token) => {
  const added = await removeColumn(user, column, token);
  if (added.status) {
    toast.success("Successfully removed column: " + column);
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    return false;
  }
};

export const delColOptions = (column, columns) => {
  const filteredArray = columns.columnOrder.filter(
    (columnName) => columnName !== column
  );
  columns.columnOrder = filteredArray;
  delete columns[column];
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateColMutation = async (
  user,
  column,
  newColumn,
  columns,
  token
) => {
  const added = await updateColumn(user, column, newColumn, token);
  if (added.status) {
    toast.success(added.status);
    return columns;
  } else if (added.error) {
    console.log(added.error);
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    console.log("failed");
    return false;
  }
};

export const updateColOptions = (column, newColumn, columns) => {
  const currCol = columns[column];
  columns[newColumn] = currCol;
  let colOrder = columns.columnOrder;
  const index = colOrder.findIndex((item) => item === column);
  colOrder.splice(index, 1);
  colOrder.splice(index, 0, newColumn);
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateColOrderMutation = async (
  user,
  srcIndex,
  destIndex,
  columns,
  token
) => {
  const added = await updateColumnOrder(user, srcIndex, destIndex, token);
  if (added.status) {
    toast.success(added.status);
    return columns;
  } else if (added.error) {
    console.log(added.error);
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    console.log("failed");
    return false;
  }
};

export const updateColOrderOptions = (srcIndex, destIndex, columns) => {
  const newColumnOrder = Array.from(columns.columnOrder);
  const temp = newColumnOrder[srcIndex];
  newColumnOrder.splice(srcIndex, 1);
  newColumnOrder.splice(destIndex, 0, temp);
  columns.columnOrder = newColumnOrder;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
