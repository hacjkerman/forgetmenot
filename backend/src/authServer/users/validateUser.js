import { dbConnect } from "../../database/db.js";
import bcrypt from "bcrypt";

export async function validateUser(user, password) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userFound = await users.findOne({
    username: user,
  });
  if (!userFound) {
    // USER DOES NOT EXIST
    return false;
  }
  const result = await bcrypt.compare(password, userFound.password);
  if (result) {
    return userFound.username;
  }
  // INVALID PASSWORD
  return false;
}
