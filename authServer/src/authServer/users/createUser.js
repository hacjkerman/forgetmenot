import { dbConnect } from "../../database/db.js";
import bcrypt from "bcrypt";

export async function createUser(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  // ISSUE - WILL INSERT DUPLICATE USERS. FIX FOR LATER
  const userFound = users.find({
    $or: [{ username: user.username }, { email: user.email }],
  });
  let newUser = user;
  user.number = null;
  const foundArray = await userFound.toArray();
  const saltRounds = 10;

  if (foundArray.length === 0) {
    bcrypt.hash(user.password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        return err;
      }
      newUser.password = hash;
      const insertResult = await users.insertOne(newUser);
      console.log(insertResult);
    });
    return { status: "Success" };
  }
  return undefined;
}
