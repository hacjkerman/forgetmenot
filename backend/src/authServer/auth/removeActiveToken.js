import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeActiveToken(token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("activeTokens");
  await collection.deleteOne({ token: token });
  return;
}
