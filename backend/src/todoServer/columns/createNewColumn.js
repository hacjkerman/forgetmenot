import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function createNewColumn(username, column) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("userTodos");
  const newColumn = {
    column: column,
    todos: [],
  };
  const isFound = await Users.findOne({
    username: username,
  });
  console.log(isFound);
  if (isFound) {
    const duplicateTodo = isFound.columns.find((column) => column === column);
    if (duplicateTodo) {
      return false;
    }
  }
  Users.insertOne({ username: username, columns: [newColumn] });
  return true;
}
