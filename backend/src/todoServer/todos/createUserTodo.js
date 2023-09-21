import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function createUserTodo(username, column, todo, dueDate) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("userTodos");
  const newTodo = {
    column: column,
    todo: todo,
    dueDate: dueDate,
  };
  const isFound = await Users.findOne({
    $and: [{ username: username, todo: todo }],
  });
  console.log(isFound);
  if (!isFound) {
    Users.insertOne({ username: username, todo: [newTodo] });
    return true;
  }
  return false;
}
