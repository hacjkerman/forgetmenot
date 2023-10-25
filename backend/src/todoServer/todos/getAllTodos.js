import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function getAllTodos(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({ username: user });
  if (!isFound) {
    // USER DOES NOT EXIST
    return false;
  }

  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    // COLUMN DOES NOT EXIST
    return false;
  }

  const colItems = isFound[foundCol];
  return colItems;
}
