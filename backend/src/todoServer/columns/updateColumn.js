import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateColumn(user, oldColumn, newColumn) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const userData = await collection.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;
  const isFound = columnData.filter((column) => column === oldColumn);
  if (isFound.length === 0) {
    // return "Column does not exist";
    return false;
  }
  const duplicate = columnData.filter((column) => column === newColumn);
  if (duplicate.length > 0) {
    // return "Duplicate Storage";
    return false;
  }
  const columnIndex = columnData.findIndex((column) => column === oldColumn);
  columnData[columnIndex] = newColumn;
  console.log(columnData);
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
