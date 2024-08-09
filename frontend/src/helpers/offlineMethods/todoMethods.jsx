import { addListener } from "../../components/DailyListener/DailyListener";

export const offAddTodo = async (newTodo, column, columns) => {
  if (newTodo.daily) {
    let dailyTodo = { ...newTodo };
    dailyTodo.column = column;
    addListener(dailyTodo);
  }
  columns[column].todos.push(newTodo);
  console.log(columns);
  columns.todoIndex++;
  localStorage.setItem("todos", JSON.stringify(columns));
};

export const offUpdateTodoDone = async (column, todo, columns) => {
  const todos = columns[column].todos;
  const newTodos = todos.map((item) => {
    if (item.id === todo) {
      item.done = !item.donel;
    }
    return item;
  });
  columns[column].todos = newTodos;
  console.log(columns);
  localStorage.setItem("todos", JSON.stringify(columns));
};

export const offDelTodo = async (column, todo, columns) => {
  const filteredArray = columns[column].todos.filter(
    (items) => items.id !== todo
  );
  columns[column].todos = filteredArray;
  localStorage.setItem("todos", JSON.stringify(columns));
};

export class offlineTodoMethods {}
