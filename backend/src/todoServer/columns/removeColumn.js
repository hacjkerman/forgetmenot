import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeColumn(user, columns, columnName) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const filteredColumns = columns.filter(
    (column) => column.column !== columnName
  );
  if (filteredColumns.length === columns.length) {
    return false;
  }
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { columns: filteredColumns } }
  );
  console.log("Removed documents =>", insertResult);
  return true;
}
