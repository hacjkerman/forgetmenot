import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function removeActiveToken(token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const tokenStorage = process.env.TOKENID;
  const IdObj = new ObjectId(tokenStorage);
  const Tokens = await collection.find({ _id: IdObj }).toArray();
  console.log(Tokens[0]);
  const filteredTokens = Tokens[0].activeTokens.filter(
    (currToken) => currToken.token !== token
  );
  const result = await collection.updateOne(
    { _id: IdObj },
    { $set: { activeTokens: filteredTokens } }
  );
  console.log(result);
  return;
}
