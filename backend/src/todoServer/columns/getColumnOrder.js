import { dbClose, dbConnect } from "../../database/db.js";

export async function getColumnOrder(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const insertResult = await userTodos.find({ username: user }).toArray();

  await dbClose();
  return insertResult[0].columnOrder;
}
