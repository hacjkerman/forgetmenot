import { dbClose, dbConnect } from "../../database/db.js";

export async function updateTodoDate(user, column, todos, todoId, newDate) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    // INDEX DOES NOT EXIST
    return false;
  }
  todos[todoIndex].due = newDate;
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { [column]: todos } }
  );
  await dbClose();
  return insertResult;
}
