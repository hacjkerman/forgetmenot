import { dbClose, dbConnect } from "../../database/db.js";

export async function updateColumn(user, oldColumn, newColumn) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const userData = await userTodos.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;
  const isFound = columnData.filter((column) => column === oldColumn);
  if (isFound.length === 0) {
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
  console.log(columnData);
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  console.log("All Todos documents =>", insertResult);
  await dbClose();
  return insertResult;
}
