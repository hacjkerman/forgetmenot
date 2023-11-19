import { dbConnect } from "../../database/db.js";
import findColumn from "./findColumn.js";

export async function removeColumn(user, columnName) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  if (!foundUser) {
    return { error: "User not found" };
  }

  const foundCol = findColumn(foundUser, columnName);
  if (!foundCol) {
    return { error: "Column not found" };
  }
  await userTodos.updateOne(
    { username: user },
    { $unset: { [columnName]: 1 } }
  );
  const colOrder = foundUser.columnOrder;
  const filteredColumns = colOrder.filter((column) => column !== columnName);
  if (filteredColumns.length === colOrder.length) {
    return { error: "Column unsuccessfully removed" };
  }
  await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: filteredColumns } }
  );

  return { status: "Column removed successfully" };
}
