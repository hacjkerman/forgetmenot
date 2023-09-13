import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeTodo(user, Todos, todo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const filteredTodos = Todos.filter((todoName) => todoName.todo !== todo);
  if (filteredTodos.length === Todos.length) {
    return false;
  }
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todo: filteredTodos } }
  );
  console.log("Removed documents =>", insertResult);
  return true;
}
