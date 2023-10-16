import "dotenv/config";
import { dbClose, dbConnect } from "../../database/db.js";

export async function findUserInTokens(user) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  const isFound = await collection.findOne({ username: user });
  if (!isFound) {
    await dbClose();
    return false;
  }
  await dbClose();
  return true;
}
