import { dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function getAllTodos(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({ username: user });
  if (!foundUser) {
    return { error: "User does not exist" };
  }
  const foundCol = findColumn(foundUser, column);
  if (!foundCol) {
    return { error: "Column does not exist" };
  }

  const colItems = foundUser[foundCol];
  return colItems;
}
