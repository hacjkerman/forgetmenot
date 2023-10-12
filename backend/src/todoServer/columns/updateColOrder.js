import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function updateColumn(user, srcIndex, destIndex) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("userTodos");
  const userData = await collection.find({ username: user }).toArray();
  const columnData = userData[0].columns;
  if (srcIndex > columnData.length || destIndex > columnData.length) {
    return false;
  }
  const temp = columnData[destIndex];
  columnData[destIndex] = srcIndex;
  columnData[srcIndex] = temp;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  console.log("All Todos documents =>", insertResult);
  return insertResult;
}
