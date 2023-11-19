import { dbConnect } from "../../database/db.js";

export async function updatePass(userId, password) {
  const db = await dbConnect();
  const collection = db.collection("users");
  await collection.updateOne({ _id: userId }, { password: password });
  return;
}
