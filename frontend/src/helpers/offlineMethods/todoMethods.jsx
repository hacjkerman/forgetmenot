import { addListener } from "../../components/DailyListener/DailyListener";
import { setItemInLocal } from "./localInterface";

export const offAddTodo = (newTodo, column, columns) => {
  if (newTodo.daily) {
    let dailyTodo = { ...newTodo };
    dailyTodo.column = column;
    addListener(dailyTodo);
  }
  columns[column].todos.push(newTodo);
  columns.todoIndex++;
  setItemInLocal("todos", columns);
};

export const offUpdateTodoDone = (column, todo, columns) => {
  const todos = columns[column].todos;
  const newTodos = todos.map((item) => {
    if (item.id === todo) {
      item.done = !item.done;
    }
    return item;
  });
  columns[column].todos = newTodos;
  setItemInLocal("todos", columns);
};

export const offDelTodo = (column, todo, columns) => {
  const filteredArray = columns[column].todos.filter(
    (items) => items.id !== todo
  );
  columns[column].todos = filteredArray;
  setItemInLocal("todos", columns);
};

export const offUpdateTodo = (column, todo, newTodo, colour, columns) => {
  const currCol = columns[column].todos;
  const item = currCol.find((item) => item.id === todo);
  item.todo = newTodo;
  item.colour = colour;
  setItemInLocal("todos", columns);
};

export const offUpdateTodoOrder = (
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
    setItemInLocal("todos", columns);
    return;
  }
  const destItem = columns[newColumn].todos;
  const temp = srcItem[srcIndex];
  srcItem.splice(srcIndex, 1);
  destItem.splice(destIndex, 0, temp);
  columns[newColumn].todos = destItem;
  columns[oldColumn].todos = srcItem;
  setItemInLocal("todos", columns);
};

export const offUpdateTodoDate = (column, todo, newDate, columns) => {
  const currCol = columns[column].todos;
  const item = currCol.find((item) => item.id === todo);
  item.due = newDate;
  setItemInLocal("todos", columns);
};

export const offUpdateTodoEstimate = (column, todo, newEstimate, columns) => {
  const currCol = columns[column].todos;
  const item = currCol.find((item) => item.id === todo);
  item.estimate = newEstimate;
  setItemInLocal("todos", columns);
};

export class offlineTodoMethods {}
