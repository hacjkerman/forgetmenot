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
  const isFound = await userTodos.findOne({
    username: user,
  });
  if (!isFound) {
    // USER DOES NOT EXIST
    return false;
  }
  const oldColFound = findColumn(isFound, oldColumn);
  if (!oldColFound) {
    // COLUMN DOES NOT EXIST
    return false;
  }
  const newColFound = findColumn(isFound, newColumn);
  if (!newColFound) {
    // COLUMN DOES NOT EXIST
    return false;
  }

  if (oldColFound === newColFound) {
    const currCol = isFound[oldColFound];
    const temp = currCol[destIndex];
    console.log(temp);
    currCol[destIndex] = currCol[srcIndex];
    currCol[srcIndex] = temp;
    await userTodos.updateOne(
      { username: user },
      { $set: { [oldColumn]: currCol } }
    );
    return;
  }

  const oldTodos = isFound[oldColumn];
  const temp = oldTodos[srcIndex];
  const filteredTodos = oldTodos.filter((todoName) => todoName.id !== temp.id);
  if (filteredTodos.length === oldTodos.length) {
    // TODO DOES NOT EXIST

    return false;
  }
  const newTodos = isFound[newColumn];
  newTodos.splice(destIndex, 0, temp);
  await userTodos.updateOne(
    { username: user },
    { $set: { [oldColumn]: filteredTodos } }
  );
  await userTodos.updateOne(
    { username: user },
    { $set: { [newColumn]: newTodos } }
  );
  // SUCCESS
  return true;
}
