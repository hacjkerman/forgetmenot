import { dbConnect } from "../../database/db.js";

export async function updateColOrder(user, srcIndex, destIndex) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const userData = await userTodos.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;
  if (srcIndex > columnData.length || destIndex > columnData.length) {
    return { error: "Column does not exist" };
  }
  const temp = columnData[srcIndex];
  columnData.splice(srcIndex, 1);
  columnData.splice(destIndex, 0, temp);
  await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: columnData } }
  );
  return { status: "Update successful" };
}
