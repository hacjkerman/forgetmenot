import { dbConnect } from "../../database/db.js";

export async function updatePhone(userId, phoneNumber) {
  const db = await dbConnect();
  const collection = db.collection("users");
  await collection.updateOne(
    { username: userId },
    { $set: { number: phoneNumber } }
  );
  return;
}
