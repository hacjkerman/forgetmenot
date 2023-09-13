import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function verifyUser(user, sessionId) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("activeTokens");
  const isFound = await collection.findOne({
    $and: [{ username: user }, { token: sessionId }],
  });
  console.log(isFound);
  if (!isFound) {
    return false;
  }
  return true;
}
