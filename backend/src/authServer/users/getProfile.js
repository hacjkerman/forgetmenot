import { dbConnect } from "../../database/db.js";

export async function getProfile(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userFound = await users.findOne({
    username: user,
  });
  if (!userFound) {
    return false;
  }
  delete userFound._id;
  delete userFound.password;
  return userFound;
}
