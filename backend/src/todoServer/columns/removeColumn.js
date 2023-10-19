import { dbClose, dbConnect } from "../../database/db.js";

export async function removeColumn(user, columns, columnName) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const filteredColumns = columns.filter((column) => column !== columnName);
  if (filteredColumns.length === columns.length) {
    return false;
  }
  await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: filteredColumns } }
  );
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $unset: { [columnName]: 1 } }
  );
  await dbClose();
  return true;
}
