import { dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function getUserObj(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  if (!foundUser) {
    // USER DOES NOT EXIST
    return null;
  }
  const foundCol = findColumn(foundUser, column);
  if (!foundCol) {
    return null;
  }
  return { db, foundUser, foundCol };
}
