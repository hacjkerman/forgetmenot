import { dbConnect } from "../../database/db.js";

export async function getPhone(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userFound = await users.findOne({
    username: user,
  });
  if (!userFound) {
    return false;
  }
  return { phone: userFound.number };
}
