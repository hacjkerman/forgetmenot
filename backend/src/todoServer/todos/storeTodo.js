import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function storeTodo(username, column, todo, dueDate) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");

  const isFound = await userTodos.findOne({
    username: username,
  });
  if (!isFound) {
    await dbClose();
    // USER DOES NOT EXIST
    return false;
  }
  const newTodo = {
    id: isFound.todoIndex,
    todo,
    due: dueDate,
  };
  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    await dbClose();
    // COLUMN DOES NOT EXIST
    return false;
  }
  await userTodos.updateOne(
    { username: username },
    { $push: { [column]: newTodo }, $inc: { todoIndex: 1 } }
  );
  await dbClose();
  return true;
}
