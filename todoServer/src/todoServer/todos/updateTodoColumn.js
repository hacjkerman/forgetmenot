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
  // ERROR CHECKING
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
  // SAME COLUMN
  if (oldColFound === newColFound) {
    const colObj = { ...foundUser[oldColFound] };
    const currCol = foundUser[oldColFound].todos;
    const temp = currCol[srcIndex];
    currCol.splice(srcIndex, 1);
    currCol.splice(destIndex, 0, temp);
    colObj.todos = currCol;
    await userTodos.updateOne(
      { username: user },
      { $set: { [oldColumn]: colObj } }
    );
    return;
  }
  // FIND SOLUTION TO UPDATE WITHOUT RESETTING ENTIRE OBJECT
  // SLOW METHOD
  const oldColObj = { ...foundUser[oldColFound] };
  const oldTodos = foundUser[oldColumn].todos;
  const temp = oldTodos[srcIndex];
  oldTodos.splice(srcIndex, 1);
  oldColObj.todos = oldTodos;
  const newColObj = { ...foundUser[newColFound] };
  const newTodos = foundUser[newColumn].todos;
  newTodos.splice(destIndex, 0, temp);
  newColObj.todos = newTodos;
  // DB CALLS
  await userTodos.updateOne(
    { username: user },
    { $set: { [oldColumn]: oldColObj } }
  );
  await userTodos.updateOne(
    { username: user },
    { $set: { [newColumn]: newColObj } }
  );
  // SUCCESS
  return { status: "Todo column successfully updated" };
}
