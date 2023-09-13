import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function getAllActiveTokens() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const tokenStorage = process.env.TOKENID;
  const IdObj = new ObjectId(tokenStorage);
  const insertResult = await collection.find({ _id: IdObj }).toArray();
  return insertResult[0].activeTokens;
}
