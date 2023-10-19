import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function removeTodo(user, column, todos, todoId) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({ username: user });
  if (!isFound) {
    await dbClose();
    // USER DOES NOT EXIST
    return false;
  }
  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    await dbClose();
    // COLUMN DOES NOT EXIST
    return false;
  }
  const filteredTodos = todos.filter((todoName) => todoName.id !== todoId);
  if (filteredTodos.length === todos.length) {
    // TODO DOES NOT EXIST
    return false;
  }

  await userTodos.updateOne(
    { username: user },
    { $set: { [column]: filteredTodos } }
  );
  await dbClose();
  return true;
}
