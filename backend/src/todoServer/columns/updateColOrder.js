import { dbClose, dbConnect } from "../../database/db.js";

export async function updateColOrder(user, srcIndex, destIndex) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const userData = await userTodos.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;
  if (srcIndex > columnData.length || destIndex > columnData.length) {
    // COLUMN INDEX DOES NOT EXIST
    return false;
  }
  const temp = columnData[srcIndex];
  columnData.splice(srcIndex, 1);
  columnData.splice(destIndex, 0, temp);
  const insertResult = await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  await dbClose();
  return insertResult;
}
