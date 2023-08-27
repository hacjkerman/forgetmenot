import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeRefreshToken(userId, token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const foundCursor = collection.find({ _id: userId });
  const foundArray = await foundCursor.toArray();
  if (foundArray === undefined || foundArray.refreshToken.length === 0) {
    await collection.updateOne(
      { _id: userId },
      { $push: { refreshToken: token } }
    );
  }
  return;
}
