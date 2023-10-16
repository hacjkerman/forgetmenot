import "dotenv/config";
import { dbClose, dbConnect } from "../../database/db.js";

export async function getAllActiveTokens() {
  const db = await dbConnect();
  const collection = db.collection("users");
  const tokenStorage = process.env.TOKENID;
  const IdObj = new ObjectId(tokenStorage);
  const insertResult = await collection.find({ _id: IdObj }).toArray();
  await dbClose();
  return insertResult[0].activeTokens;
}
