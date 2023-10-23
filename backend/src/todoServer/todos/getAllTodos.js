import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function getAllTodos(user, column) {
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
  await dbClose();
  return isFound[foundCol];
}
