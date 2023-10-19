import { dbClose, dbConnect } from "../../database/db.js";

export async function getColumns(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const insertResult = await userTodos.find({ username: user }).toArray();
  const columns = insertResult[0].columnOrder;
  const userEntries = Object.entries(insertResult[0]);
  const columnObj = { columnOrder: columns };
  for (let i = 0; i < columns.length; i++) {
    const isFound = userEntries.find((val) => val[0] === columns[i]);
    if (!isFound) {
      continue;
    }
    columnObj[columns[i]] = isFound[1];
  }
  await dbClose();
  return columnObj;
}
