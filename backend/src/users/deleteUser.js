import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeUser(userId) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("users");
  await collection.deleteOne({ _id: userId });
  client.close();
  return;
}
