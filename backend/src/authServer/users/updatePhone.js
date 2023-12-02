import { dbConnect } from "../../database/db.js";

export async function updatePhone(userId, phone) {
  const db = await dbConnect();
  const collection = db.collection("users");
  await collection.updateOne({ _id: userId }, { phone: phone });
  return;
}
