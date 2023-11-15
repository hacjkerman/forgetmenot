import { dbConnect } from "../../database/db.js";

export async function updateTodoDone(user, column, todos, todoId) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    // INDEX DOES NOT EXIST
    return { error: "Todo does not exist" };
  }
  const currTodo = todos[todoIndex];
  currTodo.done = !currTodo.done;
  await collection.updateOne({ username: user }, { $set: { [column]: todos } });
  return { status: "Todo successfully updated" };
}
