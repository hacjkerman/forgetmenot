import { dbClose, dbConnect } from "../../database/db.js";

export async function findUserInUsers(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userResult = await users.findOne({
    username: user,
  });
  if (!userResult) {
    await dbClose();
    return false;
  }
  await dbClose();
  return userResult;
}
