import { dbConnect } from "../../database/db.js";

export async function createGoogleUser(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  // ISSUE - WILL INSERT DUPLICATE USERS. FIX FOR LATER
  const userFound = users.find({
    $or: [{ username: user.username }, { email: user.email }],
  });
  let newUser = user;
  newUser.number = null;
  newUser.type = "google";
  const foundArray = await userFound.toArray();

  if (foundArray.length === 0) {
    const insertResult = await users.insertOne(newUser);
    console.log(insertResult);
    return { status: "Success" };
  }
  return undefined;
}
