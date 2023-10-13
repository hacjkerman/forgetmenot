import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateTodoColumn(user, Todos, todo, newColumn) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const todoIndex = Todos.findIndex((todoList) => todoList.todo === todo);
  if (!todoIndex) {
    return false;
  }
  Todos[todoIndex].column = newColumn;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: Todos } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
