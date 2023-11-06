import { dbClose, dbConnect } from "../../database/db.js";
import { storeColumn } from "./storeColumn.js";

export async function getColumns(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  let insertResult = await userTodos.find({ username: user }).toArray();
  if (insertResult.length === 0) {
    await storeColumn(user, "Habits");
    await storeColumn(user, "Todo");
    await storeColumn(user, "Done");
    insertResult = await userTodos.find({ username: user }).toArray();
  }
  // all items in object from user
  const columns = insertResult[0];
  const columnOrder = columns.columnOrder;
  const todoIndex = columns.todoIndex;
  // storing all object items in array
  const userEntries = Object.entries(columns);
  const newColumnObj = {
    columnOrder: columnOrder,
    todoIndex: todoIndex,
  };
  // mapping column todos into new column object
  for (let i = 0; i < columnOrder.length; i++) {
    const isFound = userEntries.find((val) => val[0] === columnOrder[i]);
    if (!isFound) {
      continue;
    }
    newColumnObj[columnOrder[i]] = isFound[1];
  }
  return newColumnObj;
}
