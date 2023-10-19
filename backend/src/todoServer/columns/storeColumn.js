import { dbClose, dbConnect } from "../../database/db.js";
import findColumn from "./findColumn.js";

export async function storeColumn(user, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({
    username: user,
  });
  if (!isFound) {
    await userTodos.insertOne({ username: user, columnOrder: [column] });
    await userTodos.updateOne(
      { username: user },
      { $set: { [column]: [], todoIndex: 0 } }
    );
    await dbClose();
    // USER NOT FOUND
    return false;
  }

  const foundCol = findColumn(isFound, column);
  if (foundCol) {
    await dbClose();
    // COLUMN EXISTS
    return false;
  }

  await userTodos.updateOne({ username: user }, { $set: { [column]: [] } });
  await userTodos.updateOne(
    { username: user },
    { $push: { columnOrder: column } }
  );

  await dbClose();
  return true;
}
