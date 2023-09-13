import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateName(userId, name) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("users");
  await collection.updateOne({ _id: userId }, { name: name });
  return;
}
