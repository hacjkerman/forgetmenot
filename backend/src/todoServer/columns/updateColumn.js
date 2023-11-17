import { dbConnect } from "../../database/db.js";

export async function updateColumn(user, oldColumn, newColumn) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({ username: user });
  if (!isFound) {
    return { error: "User not found" };
  }
  const columnData = isFound.columnOrder;
  const foundCol = columnData.filter((column) => column === oldColumn);
  if (foundCol.length === 0) {
    return { error: "Column does not exist" };
  }
  const duplicate = columnData.filter((column) => column === newColumn);
  if (duplicate.length > 0) {
    return { error: "Duplicate storage" };
  }
  const oldTodos = isFound[oldColumn];
  const columnIndex = columnData.findIndex((column) => column === oldColumn);
  columnData[columnIndex] = newColumn;
  await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  await userTodos.updateOne(
    { username: user },
    { $set: { [newColumn]: oldTodos } }
  );
  await userTodos.updateOne({ username: user }, { $unset: { [oldColumn]: 1 } });
  return { status: "Update successful" };
}
