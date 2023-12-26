import { dbConnect } from "../../database/db.js";

export async function validateColumn(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  if (!foundUser) {
    // USER DOES NOT EXIST
    return false;
  }

  const isValid = foundUser.columnOrder.filter(
    (columnName) => columnName === column
  );
  if (!foundUser[column]) {
    return false;
  }

  return isValid !== 0;
}
