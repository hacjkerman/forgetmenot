import "dotenv/config";
import { dbClose, dbConnect } from "../../database/db.js";

export async function removeActiveToken(token) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  await collection.deleteOne({ token: token });
  await dbClose();
  return;
}
