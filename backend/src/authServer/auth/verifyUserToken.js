import "dotenv/config";
import { dbClose, dbConnect } from "../../database/db.js";

export async function verifyUser(user, sessionId) {
  const db = await dbConnect();
  const tokens = db.collection("activeTokens");
  const isFound = await tokens.findOne({
    $and: [{ username: user }, { token: sessionId }],
  });
  return isFound;
}
