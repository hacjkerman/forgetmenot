import { dbConnect } from "../../database/db.js";

export async function storeRefreshToken(userId, token) {
  const db = await dbConnect();
  const collection = db.collection("users");

  await collection.updateOne(
    { _id: userId },
    { $set: { refreshToken: token } }
  );
  return;
}
