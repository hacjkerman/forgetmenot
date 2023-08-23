import { MongoClient } from "mongodb";
import { getAllTodos } from "./getAllTodos.js";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateTodo(user, todo, newTodo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const Todos = await getAllTodos(user);
  console.log(Todos);
  let i = 0;
  while (i < Todos.length) {
    Todos[i].todo = Todos[i].todo.replace(todo, newTodo);
    i++;
  }
  const insertResult = await collection.updateOne(
    { _id: user, todo: todo },
    { $set: { todo: Todos } }
  );
  console.log("All Todos documents =>", insertResult);
  return;
}
