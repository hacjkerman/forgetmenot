import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function validateColumn(user, column) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const insertResult = await collection.find({ username: user }).toArray();
  const isValid = insertResult[0].columnOrder.filter(
    (columnName) => columnName === column
  );
  if (isValid.length === 0) {
    return false;
  }
  return true;
}
