import { getUserObj } from "../database/getUserObj.js";

export async function updateTodoEstimate(user, column, todoId, newEstimate) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };
  if (newEstimate > 10000)
    return { error: "Estimate longer than 10000 minutes" };
  const userTodos = db.collection("userTodos");
  const todos = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    return { error: "Todo does not exist" };
  }
  todos[todoIndex].estimate = newEstimate;
  const newObj = {
    todos: todos,
    colour: foundUser[foundCol].colour,
  };
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { [foundCol]: newObj } }
  );
  return insertResult;
}
