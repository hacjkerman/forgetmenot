import { dbClose, dbConnect } from "../../database/db.js";

export async function removeRefreshToken(userId) {
  const db = await dbConnect();
  const collection = db.collection("users");
  const insertResult = await collection.updateOne(
    { _id: userId },
    { $set: { refreshToken: "" } }
  );
  await dbClose();
  return true;
}
