import { dbConnect } from "../../database/db.js";

export async function getColumnOrder(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.find({ username: user }).toArray();
  if (foundUser.length > 0) {
    const columnOrder = foundUser[0].columnOrder;
    return columnOrder;
  }
  return null;
}
