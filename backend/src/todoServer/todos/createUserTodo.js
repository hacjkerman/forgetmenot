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
    due: dueDate,
  };
  const isFound = await Users.findOne({
    username: username,
  });
  if (!isFound) {
    Users.insertOne({ username: username, todos: [newTodo] });
    return true;
  }
  if (isFound && isFound.todo) {
    const duplicateTodo = isFound.todo.find((todo) => todo === todo);
    if (duplicateTodo) {
      return false;
    }
  }
  Users.updateOne({ username: username }, { $push: { todos: newTodo } });

  return true;
}
