import { dbConnect } from "../../database/db.js";
import bcrypt from "bcrypt";

export async function validateUser(user, password) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userResult = await users.findOne({
    username: user,
  });
  if (!userResult) {
    // USER DOES NOT EXIST
    return false;
  }
  console.log(password);
  const result = await bcrypt.compare(password, userResult.password);
  if (result) {
    return userResult.username;
  }
  // INVALID PASSWORD
  return false;
}
