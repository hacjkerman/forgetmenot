import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeTodo(user, column, Todos, todo, dueDate) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("userTodos");
  const newTodo = {
    column: column,
    todo: todo,
    dueDate: dueDate,
  };
  const isFound = Todos.filter((todoName) => todoName.todo === todo);
  if (isFound.length === 0) {
    Users.updateOne({ username: user }, { $push: { todos: newTodo } });
    return true;
  }
  return false;
}
