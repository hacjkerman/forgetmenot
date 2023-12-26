import { dbConnect } from "../../database/db.js";

export async function findEmailInUsers(email) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userFound = await users.findOne({
    email: email,
  });
  if (!userFound) {
    return false;
  }
  return userFound;
}
