import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateEmail(userId, password) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("users");
  await collection.updateOne({ _id: userId }, { password: password });
  return;
}
