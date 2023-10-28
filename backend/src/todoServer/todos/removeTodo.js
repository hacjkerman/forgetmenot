import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";
import { validateColumn } from "../columns/validateColumn.js";

export async function removeTodo(user, column, todos, todoId) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");

  const isFound = await userTodos.findOne({ username: user });

  if (!isFound) {
    // USER DOES NOT EXIST
    return false;
  }
  const foundCol = validateColumn(user, column);
  if (!foundCol) {
    // COLUMN DOES NOT EXIST
    return false;
  }
  const filteredTodos = todos.filter((todoName) => todoName.id !== todoId);
  console.log(filteredTodos);
  if (filteredTodos.length === todos.length) {
    // TODO DOES NOT EXIST
    return false;
  }

  await userTodos.updateOne(
    { username: user },
    { $set: { [column]: filteredTodos } }
  );
  return true;
}
