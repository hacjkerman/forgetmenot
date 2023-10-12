import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function createNewColumn(username, column) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("userTodos");
  const isFound = await Users.findOne({
    username: username,
  });
  if (isFound) {
    const duplicateTodo = isFound.columns.find((column) => column === column);
    if (duplicateTodo) {
      return false;
    }
  }
  Users.insertOne({ username: username, columnOrder: [column] });
  return true;
}
