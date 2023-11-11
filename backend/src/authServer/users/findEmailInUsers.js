import { dbConnect } from "../../database/db.js";

export async function findEmailInUsers(email) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userResult = await users.findOne({
    email: email,
  });
  if (!userResult) {
    return false;
  }
  return userResult;
}
