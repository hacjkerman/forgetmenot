import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function storeTodo(username, column, todo, dueDate) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");

  const isFound = await userTodos.findOne({
    username: username,
  });
  if (!isFound) {
    // USER DOES NOT EXIST
    return false;
  }
  const newTodo = {
    id: isFound.todoIndex.toString(),
    todo,
    due: dueDate,
  };
  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    // COLUMN DOES NOT EXIST
    return false;
  }
  await userTodos.updateOne(
    { username: username },
    { $push: { [column]: newTodo }, $inc: { todoIndex: 1 } }
  );
  return true;
}
