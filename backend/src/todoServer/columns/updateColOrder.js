import { dbClose, dbConnect } from "../../database/db.js";

export async function updateColOrder(user, srcIndex, destIndex) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const userData = await userTodos.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;
  if (srcIndex > columnData.length || destIndex > columnData.length) {
    return false;
  }
  const temp = columnData[destIndex];
  columnData[destIndex] = columnData[srcIndex];
  columnData[srcIndex] = temp;
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  await dbClose();
  return insertResult;
}
