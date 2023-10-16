import { dbClose, dbConnect } from "../../database/db.js";

export async function createUserTodo(username, column, todo, dueDate) {
  const db = await dbConnect();
  const Users = db.collection("userTodos");
  const newTodo = {
    column,
    todo,
    due: dueDate,
  };
  const isFound = await Users.findOne({
    username: username,
  });
  if (!isFound) {
    Users.insertOne({ username: username, todos: [newTodo] });
    return true;
  }
  if (isFound && isFound.todo) {
    const duplicateTodo = isFound.todo.find((todo) => todo === todo);
    if (duplicateTodo) {
      return false;
    }
  }
  await Users.updateOne({ username: username }, { $push: { todos: newTodo } });
  await dbClose();
  return true;
}
