import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function findTodo(userId, todo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const insertResult = collection.find({ todo: todo });
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
