import "dotenv/config";
import { dbConnect } from "../../database/db.js";

export async function findUserInTokens(user) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  const isFound = await collection.findOne({ username: user });
  if (!isFound) {
    return false;
  }
  return true;
}
