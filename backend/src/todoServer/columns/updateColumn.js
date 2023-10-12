import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateColumn(user, oldColumn, newColumn) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const userData = await collection.find({ username: user }).toArray();
  const columnData = userData[0].columns;
  const columnIndex = columnData.findIndex(
    (column) => column.column === oldColumn
  );
  const filteredColumn = columnData.filter(
    (column) => column.column !== oldColumn
  );
  const updatedColumn = { ...columnData[columnIndex], column: newColumn };
  const storeColumn = [...filteredColumn, updatedColumn];
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { columns: storeColumn } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
