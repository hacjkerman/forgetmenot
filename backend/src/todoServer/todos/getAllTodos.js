import { dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function getAllTodos(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({ username: user });
  if (!isFound) {
    return { error: "User does not exist" };
  }

  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    return { error: "Column does not exist" };
  }

  const colItems = isFound[foundCol];
  return colItems;
}
