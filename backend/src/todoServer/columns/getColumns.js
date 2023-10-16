import { dbClose, dbConnect } from "../../database/db.js";

export async function getColumns(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const insertResult = await userTodos.find({ username: user }).toArray();
  console.log("All Todos documents =>", insertResult);
  await dbClose();
  return insertResult[0].columnOrder;
}
