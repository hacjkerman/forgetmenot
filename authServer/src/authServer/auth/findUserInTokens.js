import "dotenv/config";
import { dbConnect } from "../../database/db.js";

export async function findUserInTokens(user) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  const userFound = await collection.findOne({ username: user });
  if (!userFound) {
    return false;
  }
  return { accessToken: userFound.token, expires: userFound.expires };
}
