import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeActiveToken(userId, token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const tokenStorage = process.env.TOKENID;
  const IdObj = new ObjectId(tokenStorage);
  const userStr = userId.toString();
  const Tokens = await collection.find({ _id: IdObj }).toArray();
  const filteredTokens = Tokens[0].activeTokens.filter(
    (currToken) => currToken.userId.toString() === userStr
  );
  if (filteredTokens.length === 0) {
    await collection.updateOne(
      { _id: IdObj },
      {
        $push: {
          activeTokens: {
            userId: userId,
            token: token,
            expiresAt: { $date: "2024-09-01T16:00:00Z" },
          },
        },
      }
    );
  }
  return;
}
