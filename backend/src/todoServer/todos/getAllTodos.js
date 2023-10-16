import { dbClose, dbConnect } from "../../database/db.js";

export async function getAllTodos(user) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const insertResult = await collection.find({ username: user }).toArray();
  console.log("All Todos documents =>", insertResult);
  await dbClose();
  return insertResult[0].todos;
}
