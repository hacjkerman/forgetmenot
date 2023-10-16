import { dbClose, dbConnect } from "../../database/db.js";
export async function validateUser(user, password) {
  const db = await dbConnect();
  const users = db.collection("users");
  const userResult = await users.findOne({
    username: user,
    password: password,
  });
  if (!userResult) {
    await dbClose();
    return false;
  }
  await dbClose();
  return userResult._id;
}
