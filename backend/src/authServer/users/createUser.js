import { dbClose, dbConnect } from "../../database/db.js";

export async function createUser(user) {
  const db = await dbConnect();
  const users = db.collection("users");
  // ISSUE - WILL INSERT DUPLICATE USERS. FIX FOR LATER
  const foundCursor = users.find({
    $or: [{ username: user.username }, { email: user.email }],
  });
  const foundArray = await foundCursor.toArray();
  if (foundArray.length === 0) {
    const insertResult = await users.insertOne(user);
    console.log("Created user =>", insertResult);
    await dbClose();
    return insertResult.insertedId;
  }
  await dbClose();
  return undefined;
}
