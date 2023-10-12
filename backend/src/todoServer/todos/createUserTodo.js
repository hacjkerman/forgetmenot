import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function createUserTodo(username, column, todo, dueDate) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("userTodos");
  const newColumn = {
    columns: column,
    todos: [todo],
    dueDate: dueDate,
  };
  const isFound = await Users.findOne({
    username: username,
  });
  console.log(isFound);
  if (isFound) {
    const duplicateTodo = isFound.todo.find((todo) => todo === todo);
    if (duplicateTodo) {
      return false;
    }
  }
  Users.insertOne({ username: username, column: [newTodo] });
  return true;
}
