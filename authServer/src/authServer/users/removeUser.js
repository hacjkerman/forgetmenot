import { dbConnect } from "../../database/db.js";

export async function removeUser(userId) {
  const db = await dbConnect();
  const collection = db.collection("users");
  await collection.deleteOne({ _id: userId });
  return;
}
