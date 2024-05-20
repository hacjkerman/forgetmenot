import { getUserObj } from "../database/getUserObj.js";

export async function updateTodoDone(user, column, todoId) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };

  const collection = db.collection("userTodos");
  const todos = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    // INDEX DOES NOT EXIST
    return { error: "Todo does not exist" };
  }
  const currTodo = todos[todoIndex];
  currTodo.done = !currTodo.done;
  const newObj = {
    todos,
    colour: foundUser[foundCol].colour,
  };
  await collection.updateOne(
    { username: user },
    { $set: { [foundCol]: newObj } }
  );
  return { status: "Todo successfully updated" };
}
