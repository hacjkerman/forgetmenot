import { dbClose, dbConnect } from "../../database/db.js";

export async function storeTodo(user, column, todos, todo, dueDate) {
  const db = await dbConnect();
  const Users = db.collection("userTodos");
  const newTodo = {
    column: column,
    todo: todo,
    dueDate: dueDate,
  };
  const columnExists = todos.filter((todoName) => todoName.column === column);
  if (columnExists.length === 0) {
    // COLUMN DOES NOT EXIST
    return false;
  }
  const isFound = todos.filter((todoName) => todoName.todo === todo);
  if (isFound.length === 0) {
    Users.updateOne({ username: user }, { $push: { todos: newTodo } });
    return true;
  }
  await dbClose();
  return false;
}
