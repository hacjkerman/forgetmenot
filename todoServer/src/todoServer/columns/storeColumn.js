import { dbConnect } from "../../database/db.js";
import findColumn from "./findColumn.js";

export async function storeColumn(user, column, colour, currCol) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  const newCol = { todos: [], colour: colour };
  if (!foundUser) {
    await userTodos.insertOne({ username: user, columnOrder: [column] });
    await userTodos.updateOne(
      { username: user },
      { $set: { [column]: newCol, todoIndex: 0 } }
    );
    return { status: "New user" };
  }

  const foundCol = findColumn(foundUser, column);
  if (foundCol) {
    return { error: "Column already exists" };
  }
  const newColOrder = foundUser.columnOrder;
  newColOrder.splice(currCol, 0, column);
  await userTodos.updateOne(
    { username: user },
    {
      $set: { [column]: newCol, columnOrder: newColOrder },
    }
  );

  return { status: "Storage successful" };
}
