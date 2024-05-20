import { dbConnect } from "../../database/db.js";
import "dotenv/config";

export async function storeActiveToken(username, email, token, expires) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  const curr = Date.now();
  await collection.createIndex(
    { createdAt: curr },
    { expireAfterSeconds: 3598 }
  );
  await collection.insertOne({
    username,
    email,
    token,
    expires,
    createdAt: new Date(),
  });
  return;
}
