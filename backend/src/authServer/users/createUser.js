import { dbClose, dbConnect } from "../../database/db.js";
import bcrypt from "bcrypt";

export async function createUser(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  // ISSUE - WILL INSERT DUPLICATE USERS. FIX FOR LATER
  const foundCursor = users.find({
    $or: [{ username: user.username }, { email: user.email }],
  });
  const newUser = user;
  const foundArray = await foundCursor.toArray();
  const saltRounds = 10;

  if (foundArray.length === 0) {
    bcrypt.hash(user.password, saltRounds, async function (err, hash) {
      newUser.password = hash;
      const insertResult = await users.insertOne(newUser);
    });
    return { status: "Success" };
  }
  return undefined;
}
