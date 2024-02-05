import { dbConnect } from "../../db.js";

export async function getAllUsers() {
  const db = await dbConnect();
  const users = db.collection("users");
  const userFound = users.find();
  if (!userFound) {
    return false;
  }
  const foundArray = await userFound.toArray();
  console.log(foundArray);

  const allUsers = [];
  for (let i = 0; i < foundArray.length; i++) {
    const user = {
      email: foundArray[i].email,
      username: foundArray[i].username,
    };
    allUsers.push(user);
  }

  return allUsers;
}
