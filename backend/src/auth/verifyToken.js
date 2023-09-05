import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function verifyToken(token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("activeTokens");
  const isFound = await collection.findOne({ token: token });
  if (!isFound) {
    return false;
  }
  return true;
}
