import { dbConnect } from "../../database/db.js";
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
    return { status: "New user" };
  }

  const foundCol = findColumn(isFound, column);
  if (foundCol) {
    return { error: "Column already exists" };
  }

  await userTodos.updateOne({ username: user }, { $set: { [column]: [] } });
  await userTodos.updateOne(
    { username: user },
    { $push: { columnOrder: column } }
  );

  return { status: "Storage successful" };
}
