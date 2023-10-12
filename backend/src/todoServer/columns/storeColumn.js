import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeColumn(user, column) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const userData = await collection.find({ username: user }).toArray();
  const columnData = userData[0].columns;
  const newColumn = {
    column: column,
    todos: [],
  };

  const isFound = columnData.filter((column) => column.column === column);
  if (isFound.length === 0) {
    columnData.push(newColumn);
    collection.updateOne({ username: user }, { $set: { columns: columnData } });
    return true;
  }
  return false;
}
