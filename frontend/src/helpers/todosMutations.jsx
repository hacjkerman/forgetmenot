import {
  storeTodo,
  updateTodo,
  removeTodo,
  updateTodoOrder,
  updateTodoDate,
  updateTodoEstimate,
} from "../api/Todosapi.jsx";
import { toast } from "react-hot-toast";

export const addTodoMutation = async (
  user,
  column,
  newTodo,
  estimate,
  due,
  colour,
  token,
  columns
) => {
  const added = await storeTodo(
    user,
    column,
    newTodo,
    estimate,
    due,
    colour,
    token
  );
  if (added.status) {
    toast.success("Successfully added todo: " + newTodo);
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    return false;
  }
};

export const addTodoOptions = (newTodo, column, columns) => {
  columns[column].todos.push(newTodo);
  columns.todoIndex++;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: true,
  };
};

export const delTodoMutation = async (user, column, todo, columns, token) => {
  if (!columns[column].find((items) => items.id === todo.id)) {
    return false;
  }
  const added = await removeTodo(user, column, todo.id, token);
  if (added.status) {
    toast.success("Successfully removed todo: " + todo.todo);
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
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
    revalidate: true,
  };
};

export const updateTodoMutation = async (
  user,
  column,
  todo,
  newTodo,
  newColour,
  columns,
  token
) => {
  const added = await updateTodo(user, column, todo, newTodo, newColour, token);
  if (added.status) {
    toast.success(added.status);
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    return false;
  }
};

export const updateTodoOptions = (column, todo, newTodo, colour, columns) => {
  const currCol = columns[column].todos;
  const item = currCol.find((item) => item.id === todo);
  item.todo = newTodo;
  item.colour = colour;
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};

export const updateTodoEstimateMutation = async (
  user,
  column,
  todo,
  newEstimate,
  columns,
  token
) => {
  const added = await updateTodoEstimate(
    user,
    column,
    todo,
    newEstimate,
    token
  );
  if (added.status) {
    toast.success(added.status);
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    return false;
  }
};

export const updateTodoEstimateOptions = (
  column,
  todo,
  newEstimate,
  columns
) => {
  const currCol = columns[column].todos;
  const item = currCol.find((item) => item.id === todo);
  item.estimate = newEstimate;
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
    toast.success("Todo column successfully updated");
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
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
  const srcItem = columns[oldColumn].todos;
  if (oldColumn === newColumn) {
    const temp = srcItem[srcIndex];
    srcItem.splice(srcIndex, 1);
    srcItem.splice(destIndex, 0, temp);
    columns[oldColumn].todos = srcItem;
    return;
  }
  const destItem = columns[newColumn].todos;
  const temp = srcItem[srcIndex];
  srcItem.splice(srcIndex, 1);
  destItem.splice(destIndex, 0, temp);
  columns[newColumn].todos = destItem;
  columns[oldColumn].todos = srcItem;
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
  if (added.status) {
    toast.success("Todo column successfully updated");
    return columns;
  } else if (added.error) {
    toast.error("400 " + added.error);
    return false;
  } else {
    toast.error("400 Unknown failure");
    return false;
  }
};

export const updateTodoDateOptions = (column, todo, newDate, columns) => {
  const currCol = columns[column].todos;
  console.log(currCol);
  const item = currCol.find((item) => item.id === todo);
  item.date = newDate;
  console.log(currCol);
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: true,
  };
};
