import { dbConnect } from "../../database/db.js";
import "dotenv/config";

export async function storeActiveToken(username, email, token, expires) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  const curr = Date.now();
  const indexes = await collection.indexes();
  if (indexes.length >= 63) {
    await collection.dropIndexes();
  }
  await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3595 });
  await collection.insertOne({
    username,
    email,
    token,
    expires,
    createdAt: new Date(),
  });
  return;
}
