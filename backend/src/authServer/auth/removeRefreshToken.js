import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeRefreshToken(userId) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const insertResult = await collection.updateOne(
    { _id: userId },
    { $set: { refreshToken: "" } }
  );
  console.log("Removed documents =>", insertResult);
  return true;
}
