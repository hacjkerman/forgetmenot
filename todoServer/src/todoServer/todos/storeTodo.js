import { dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function storeTodo(username, column, todo, estimate, dueDate) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");

  const isFound = await userTodos.findOne({
    username: username,
  });
  if (!isFound) {
    // USER DOES NOT EXIST
    return { error: "User does not exist" };
  }
  if (todo.length > 256) {
    return { error: "Todo has to be less than 256 characters long" };
  }
  const newTodo = {
    id: isFound.todoIndex.toString(),
    todo,
    estimate,
    due: dueDate,
    done: false,
  };
  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    // COLUMN DOES NOT EXIST
    return { error: "Column does not exist" };
  }
  await userTodos.updateOne(
    { username: username },
    { $push: { [column]: newTodo }, $inc: { todoIndex: 1 } }
  );
  return { status: "Storage successful" };
}
