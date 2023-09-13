import { MongoClient } from "mongodb";
import { getAllTodos } from "./getAllTodos.js";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateTodo(user, Todos, todo, newTodo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const todoIndex = Todos.findIndex((todoList) => todoList.todo === todo);
  Todos[todoIndex].todo = newTodo;
  console.log(Todos[todoIndex]);
  console.log(Todos);
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todo: Todos } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
