import { dbClose, dbConnect } from "../../database/db.js";

export async function getColumnOrder(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const insertResult = await userTodos.find({ username: user }).toArray();

  const columnOrder = insertResult[0].columnOrder;
  return columnOrder;
}
