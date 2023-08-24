import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function getAllTodos(userId) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const insertResult = await collection.find({ _id: userId }).toArray();
  console.log("All Todos documents =>", insertResult);
  return insertResult[0].todo;
}
