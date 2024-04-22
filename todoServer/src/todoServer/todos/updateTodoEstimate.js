import { dbConnect } from "../../database/db.js";

export async function updateTodoEstimate(
  user,
  column,
  todos,
  todoId,
  newEstimate
) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    return { error: "Todo does not exist" };
  }
  todos[todoIndex].estimate = newEstimate;
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { [column]: todos } }
  );
  return insertResult;
}
