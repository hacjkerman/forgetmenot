import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeTodo(userId, Todos, todo, dueDate) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("users");
  const newTodo = {
    todo: todo,
    dueDate: dueDate,
  };
  console.log(userId);
  const isFound = Todos.filter((todoName) => todoName.todo === todo);
  if (isFound.length === 0) {
    Users.updateOne({ _id: userId }, { $push: { todo: newTodo } });
    return true;
  }
  return false;
}
