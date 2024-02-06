import { dbConnect } from "../../db.js";
import "dotenv/config";

export async function getAllTodos(user) {
  const db = await dbConnect();
  const users = db.collection("userTodos");
  const userFound = await users.findOne({
    username: user,
  });
  if (!userFound) {
    return false;
  }
  const todoArrays = [];
  userFound.columnOrder.forEach((column) => {
    todoArrays.push(...userFound[column]);
  });
  return todoArrays;
}
