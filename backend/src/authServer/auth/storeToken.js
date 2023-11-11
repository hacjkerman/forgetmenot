import { dbConnect } from "../../database/db.js";
import "dotenv/config";

export async function storeActiveToken(username, email, token) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
  await collection.insertOne({
    username: username,
    email: email,
    token: token,
    createdAt: new Date(),
  });
  return;
}
