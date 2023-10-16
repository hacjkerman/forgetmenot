import { dbClose, dbConnect } from "../../database/db.js";

export async function validateColumn(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const insertResult = await userTodos.find({ username: user }).toArray();
  const isValid = insertResult[0].columnOrder.filter(
    (columnName) => columnName === column
  );

  await dbClose();
  return isValid !== 0;
}
