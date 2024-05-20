import { getUserObj } from "../database/getUserObj.js";

export async function removeTodo(user, column, todoId) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };
  const userTodos = db.collection("userTodos");

  const todos = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  const filteredTodos = todos.filter((todoName) => todoName.id !== todoId);
  if (filteredTodos.length === todos.length) {
    // TODO DOES NOT EXIST
    return { error: "Todo does not exist" };
  }
  const newObj = {
    todos: filteredTodos,
    colour: foundUser[foundCol].colour,
  };
  await userTodos.updateOne({ username: user }, { $set: { [column]: newObj } });
  return { status: "Todo successfully removed" };
}
