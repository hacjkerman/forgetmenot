import { dbClose, dbConnect } from "../../database/db.js";

export async function storeColumn(user, newColumn) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const userData = await collection.find({ username: user }).toArray();
  const columnData = userData[0].columnOrder;

  const isFound = columnData.filter((column) => column === newColumn);
  console.log(isFound);
  if (isFound.length === 0) {
    await userTodos.updateOne(
      { username: user },
      { $push: { columnOrder: newColumn } }
    );
    await dbClose();
    return true;
  }
  await dbClose();
  return false;
}
