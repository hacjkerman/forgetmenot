import "dotenv/config";
import { dbConnect } from "../../database/db.js";

export async function removeActiveToken(token) {
  const db = await dbConnect();
  const tokens = db.collection("activeTokens");
  await tokens.deleteOne({ token: token });
  // valid return
  return true;
}
