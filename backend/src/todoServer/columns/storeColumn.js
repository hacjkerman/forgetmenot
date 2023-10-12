import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeColumn(user, newColumn) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const userData = await collection.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;

  const isFound = columnData.filter((column) => column === newColumn);
  console.log(isFound);
  if (isFound.length === 0) {
    collection.updateOne(
      { username: user },
      { $push: { columnOrder: newColumn } }
    );
    return true;
  }
  return false;
}
