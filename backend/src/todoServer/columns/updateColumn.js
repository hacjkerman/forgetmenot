import { dbConnect } from "../../database/db.js";

export async function updateColumn(user, oldColumn, newColumn) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({ username: user });
  if (!foundUser) {
    return { error: "User not found" };
  }
  const columnData = foundUser.columnOrder;
  const foundCol = columnData.filter((column) => column === oldColumn);
  if (foundCol.length === 0) {
    return { error: "Column does not exist" };
  }
  const duplicate = columnData.filter((column) => column === newColumn);
  if (duplicate.length > 0) {
    return { error: "Duplicate storage" };
  }
  const oldTodos = foundUser[oldColumn];
  const columnIndex = columnData.findIndex((column) => column === oldColumn);
  columnData[columnIndex] = newColumn;
  await userTodos.updateMany({ username: user }, [
    { $set: { columnOrder: columnData } },
    { $set: { [newColumn]: oldTodos } },
    { $unset: [oldColumn] },
  ]);
  return { status: "Update successful" };
}
