import { dbConnect } from "../../database/db.js";
import { newUserGen } from "../users/newUserGen.js";

export async function getColumns(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  let foundUser = await userTodos.find({ username: user }).toArray();
  if (foundUser.length === 0) {
    console.log("enters");
    await newUserGen(user);
    foundUser = await userTodos.find({ username: user }).toArray();
  }
  // all items in object from user
  const columns = foundUser[0];
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
