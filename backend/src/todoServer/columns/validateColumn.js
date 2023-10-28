import { dbConnect } from "../../database/db.js";

export async function validateColumn(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({
    username: user,
  });
  if (!isFound) {
    // USER DOES NOT EXIST
    return false;
  }

  const isValid = isFound.columnOrder.filter(
    (columnName) => columnName === column
  );
  if (!isFound[column]) {
    return false;
  }

  return isValid !== 0;
}
