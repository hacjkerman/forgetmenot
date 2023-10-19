import { dbClose, dbConnect } from "../../database/db.js";

export async function updateColumn(user, oldColumn, newColumn) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({ username: user });
  if (!isFound) {
    await dbClose();
    return false;
  }
  const columnData = isFound.columnOrder;
  const foundCol = columnData.filter((column) => column === oldColumn);
  if (foundCol.length === 0) {
    // return "Column does not exist";
    return false;
  }
  const duplicate = columnData.filter((column) => column === newColumn);
  if (duplicate.length > 0) {
    // return "Duplicate Storage";
    return false;
  }
  const columnIndex = columnData.findIndex((column) => column === oldColumn);
  columnData[columnIndex] = newColumn;
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  await userTodos.updateOne({ username: user }, { $set: { [newColumn]: [] } });
  await userTodos.updateOne({ username: user }, { $unset: { [oldColumn]: 1 } });
  await dbClose();
  return insertResult;
}
