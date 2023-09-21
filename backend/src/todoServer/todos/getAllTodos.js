import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function getAllTodos(user) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const insertResult = await collection.find({ username: user }).toArray();
  console.log("All Todos documents =>", insertResult);
  return insertResult[0].todo;
}
