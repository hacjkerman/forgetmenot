import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeTodo(userId, todos, todo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const filteredTodos = todos.filter((todoName) => todoName.todo !== todo);
  const insertResult = await collection.updateOne(
    { _id: userId },
    { $set: { todo: filteredTodos } }
  );
  console.log("Removed documents =>", insertResult);
  return true;
}
