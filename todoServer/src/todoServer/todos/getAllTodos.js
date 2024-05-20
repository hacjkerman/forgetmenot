import { getUserObj } from "../database/getUserObj.js";

export async function getAllTodos(user, column) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };

  const colItems = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  return colItems;
}
