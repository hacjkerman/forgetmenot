import { dbConnect } from "../../database/db.js";
import { validateColumn } from "../columns/validateColumn.js";

export async function removeTodo(user, column, todos, todoId) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");

  const isFound = await userTodos.findOne({ username: user });

  if (!isFound) {
    // USER DOES NOT EXIST
    return { error: "User does not exist" };
  }
  const foundCol = validateColumn(user, column);
  if (!foundCol) {
    // COLUMN DOES NOT EXIST
    return { error: "Column does not exist" };
  }
  const filteredTodos = todos.filter((todoName) => todoName.id !== todoId);
  if (filteredTodos.length === todos.length) {
    // TODO DOES NOT EXIST
    return { error: "Todo does not exist" };
  }

  await userTodos.updateOne(
    { username: user },
    { $set: { [column]: filteredTodos } }
  );
  return { status: "Todo successfully removed" };
}
