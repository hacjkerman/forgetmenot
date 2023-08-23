import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeTodo(userId, todo, dueDate) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("users");
  const newTodo = {
    todo: todo,
    dueDate: dueDate,
  };

  Users.updateOne({ _id: userId }, { $push: { todo: newTodo } });
  return;
}
