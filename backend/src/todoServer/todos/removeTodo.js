import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeTodo(user, column, Todos, todo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const isFound = Todos.filter((todoName) => todoName.column === column);
  if (isFound.length === 0) {
    // COLUMN DOES NOT EXIST
    return false;
  }
  const filteredTodos = Todos.filter((todoName) => todoName.todo !== todo);
  if (filteredTodos.length === Todos.length) {
    // TODO DOES NOT EXIST
    return false;
  }

  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: filteredTodos } }
  );
  console.log("Removed documents =>", insertResult);
  return true;
}
