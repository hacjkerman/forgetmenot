import { getUserObj } from "../database/getUserObj.js";

export async function updateTodo(user, column, todoId, newTodo, newColour) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };
  const userTodos = db.collection("userTodos");
  const todos = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  console.log(todoIndex);
  if (todoIndex < 0) {
    // INDEX DOES NOT EXIST
    return { error: "Todo does not exist" };
  }

  todos[todoIndex].todo = newTodo;
  todos[todoIndex].colour = newColour;
  const newObj = {
    todos,
    colour: foundUser[foundCol].colour,
  };
  await userTodos.updateOne(
    { username: user },
    { $set: { [foundCol]: newObj } }
  );
  return { status: "Todo successfully updated" };
}
