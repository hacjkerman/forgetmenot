import { dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function updateTodoColumn(
  user,
  oldColumn,
  srcIndex,
  destIndex,
  newColumn
) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  if (!foundUser) {
    return { error: "User does not exist" };
  }

  const oldColFound = findColumn(foundUser, oldColumn);
  if (!oldColFound) {
    return { error: "Old Column does not exist" };
  }
  const newColFound = findColumn(foundUser, newColumn);
  if (!newColFound) {
    return { error: "New Column does not exist" };
  }

  if (oldColFound === newColFound) {
    const currCol = foundUser[oldColFound];
    const temp = currCol[srcIndex];
    currCol.splice(srcIndex, 1);
    currCol.splice(destIndex, 0, temp);
    await userTodos.updateOne(
      { username: user },
      { $set: { [oldColumn]: currCol } }
    );
    return;
  }
  const oldTodos = foundUser[oldColumn];
  const temp = oldTodos[srcIndex];
  oldTodos.splice(srcIndex, 1);
  const newTodos = foundUser[newColumn];
  newTodos.splice(destIndex, 0, temp);
  await userTodos.updateOne(
    { username: user },
    { $set: { [oldColumn]: oldTodos } }
  );
  await userTodos.updateOne(
    { username: user },
    { $set: { [newColumn]: newTodos } }
  );
  // SUCCESS
  return { status: "Todo column successfully updated" };
}
