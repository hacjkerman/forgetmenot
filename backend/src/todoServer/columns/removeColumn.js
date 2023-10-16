import { dbClose, dbConnect } from "../../database/db.js";

export async function removeColumn(user, columns, columnName) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const filteredColumns = columns.filter((column) => column !== columnName);
  console.log(filteredColumns);
  if (filteredColumns.length === columns.length) {
    return false;
  }
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: filteredColumns } }
  );
  console.log("Removed documents =>", insertResult);
  await dbClose();
  return true;
}
