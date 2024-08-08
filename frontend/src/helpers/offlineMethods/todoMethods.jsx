import { addListener } from "../../components/DailyListener/DailyListener";

export const offAddTodo = async (newTodo, column, columns) => {
  if (newTodo.daily) {
    addListener(newTodo);
  }
  columns[column].todos.push(newTodo);
  console.log(columns);
  columns.todoIndex++;
  localStorage.setItem("todos", JSON.stringify(columns));
};
export class offlineTodoMethods {}
