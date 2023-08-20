import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function findTodo(user, todo) {
  await client.connect();
  const db = client.db(dbName);
  const userID = user.userId.toString();
  const collection = db.collection(userID);
  const insertResult = await collection.find({ todo: todo });
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
