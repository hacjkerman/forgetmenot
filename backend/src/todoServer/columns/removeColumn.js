import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "./findColumn.js";

export async function removeColumn(user, columnName) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({
    username: user,
  });
  if (!isFound) {
    await dbClose();
    // USER NOT FOUND
    return false;
  }

  const foundCol = findColumn(isFound, columnName);
  if (!foundCol) {
    await dbClose();
    // COLUMN EXISTS
    return false;
  }
  await userTodos.updateOne(
    { username: user },
    { $unset: { [columnName]: 1 } }
  );
  const colOrder = isFound.columnOrder;
  const filteredColumns = colOrder.filter((column) => column !== columnName);
  if (filteredColumns.length === colOrder.length) {
    return false;
  }
  await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: filteredColumns } }
  );

  await dbClose();
  return true;
}
