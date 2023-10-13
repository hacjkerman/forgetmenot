import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateTodo(user, Todos, todo, newTodo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const todoIndex = Todos.findIndex((todoList) => todoList.todo === todo);
  if (!todoIndex) {
    return false;
  }
  console.log(todoIndex);
  Todos[todoIndex].todo = newTodo;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: Todos } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
