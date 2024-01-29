import {
  storeTodo,
  updateTodo,
  removeTodo,
  updateTodoOrder,
  updateTodoDate,
} from "../api/Todosapi.jsx";
import { toast } from "react-hot-toast";

export const addTodoMutation = async (
  user,
  column,
  newTodo,
  due,
  token,
  columns
) => {
  const added = await storeTodo(user, column, newTodo, due, token);
  if (added.status) {
    console.log(added.status);
    toast.success(added.status + " Successfully added todo: " + newTodo);
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

export const addTodoOptions = (newTodo, column, columns) => {
  columns.todoIndex++;
  columns[column].push(newTodo);
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const delTodoMutation = async (user, column, todo, columns, token) => {
  const added = await removeTodo(user, column, todo.id, token);
  if (added.status) {
    console.log(added.status);
    toast.success(added.status + " Successfully removed todo: " + todo.todo);
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

export const delTodoOptions = (column, todo, columns) => {
  const filteredArray = columns[column].filter((items) => items.id !== todo.id);
  columns[column] = filteredArray;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateTodoMutation = async (
  user,
  column,
  todo,
  newTodo,
  columns,
  token
) => {
  const added = await updateTodo(user, column, todo, newTodo, token);
  console.log(added);
  if (added.status) {
    console.log(added.status);
    toast.success("200 " + added.status);
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

export const updateTodoOptions = (column, todo, newTodo, columns) => {
  const currCol = columns[column];
  const item = currCol.find((item) => item.id === todo);
  item.todo = newTodo;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateTodoOrderMutation = async (
  user,
  oldColumn,
  newColumn,
  srcIndex,
  destIndex,
  columns,
  token
) => {
  const added = await updateTodoOrder(
    user,
    oldColumn,
    srcIndex,
    destIndex,
    newColumn,
    token
  );
  if (added.status) {
    console.log(added.status);
    toast.success("200 Todo column successfully updated");
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

export const updateTodoOrderOptions = (
  srcIndex,
  destIndex,
  oldColumn,
  newColumn,
  columns
) => {
  const srcItem = columns[oldColumn];
  if (oldColumn === newColumn) {
    const temp = srcItem[srcIndex];
    srcItem.splice(srcIndex, 1);
    srcItem.splice(destIndex, 0, temp);
    columns[oldColumn] = srcItem;
    return;
  }
  const destItem = columns[newColumn];
  const temp = srcItem[srcIndex];
  srcItem.splice(srcIndex, 1);
  destItem.splice(destIndex, 0, temp);
  columns[newColumn] = destItem;
  columns[oldColumn] = srcItem;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateTodoDateMutation = async (
  user,
  column,
  todo,
  newDate,
  columns,
  token
) => {
  const added = await updateTodoDate(user, column, todo, newDate, token);
  console.log(added);
  if (added.status) {
    console.log(added.status);
    toast.success("200 Todo column successfully updated");
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

export const updateTodoDateOptions = (column, todo, newDate, columns) => {
  const currCol = columns[column];
  const item = currCol.find((item) => item.id === todo);
  item.date = newDate;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
