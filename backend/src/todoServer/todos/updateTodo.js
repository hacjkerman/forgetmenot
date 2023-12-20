import { dbConnect } from "../../database/db.js";

export async function updateTodo(user, column, todos, todoId, newTodo) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    // INDEX DOES NOT EXIST
    return { error: "Todo does not exist" };
  }
  todos[todoIndex].todo = newTodo;
  await userTodos.updateOne({ username: user }, { $set: { [column]: todos } });
  return { status: "Todo successfully updated" };
}
