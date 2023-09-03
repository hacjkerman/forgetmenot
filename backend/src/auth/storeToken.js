import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeActiveToken(token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("activeTokens");
  // const Tokens = await collection.find({}).toArray();
  // const filteredTokens = Tokens[0].activeTokens.filter(
  //   (currToken) => currToken.userId.toString() === userStr
  // );
  // if (filteredTokens.length === 0) {
  // RUN ONCE
  await collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
  await collection.insertOne({
    token: token,
    createdAt: new Date(),
  });
  return;
}
