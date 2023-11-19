import { dbConnect } from "../../database/db.js";

export async function updateEmail(userId, email) {
  const db = await dbConnect();
  const collection = db.collection("users");
  await collection.updateOne({ _id: userId }, { email: email });
  return;
}
