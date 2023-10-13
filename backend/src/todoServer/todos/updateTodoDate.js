import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateTodoDate(user, Todos, todo, newDate) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const todoIndex = Todos.findIndex((todoList) => todoList.todo === todo);
  console.log(todoIndex);
  Todos[todoIndex].due = newDate;
  console.log(Todos[todoIndex]);
  console.log(Todos);
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: Todos } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
