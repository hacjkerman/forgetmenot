import { dbConnect } from "../../database/db.js";

export async function updateName(userId, name) {
  const db = await dbConnect();
  const collection = db.collection("users");
  await collection.updateOne(
    { username: userId },
    { $set: { username: name } }
  );
  return;
}
