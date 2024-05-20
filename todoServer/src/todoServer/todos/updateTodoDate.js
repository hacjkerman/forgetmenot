import { getUserObj } from "../database/getUserObj.js";

export async function updateTodoDate(user, column, todoId, newDate) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };
  const userTodos = db.collection("userTodos");

  const todos = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    return { error: "Todo does not exist" };
  }
  todos[todoIndex].due = newDate;
  const newObj = { todos, colour: foundUser[foundCol].colour };
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { [foundCol]: newObj } }
  );
  return insertResult;
}
