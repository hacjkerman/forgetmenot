import { dbConnect } from "../../database/db.js";

export async function updateColumn(user, oldColumn, newColumn) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({ username: user });
  if (!foundUser) {
    return { error: "User not found" };
  }
  const columnData = foundUser.columnOrder;
  const foundCol = columnData.filter((column) => column === oldColumn);
  if (foundCol.length === 0) {
    return { error: "Column does not exist" };
  }
  const duplicate = columnData.filter((column) => column === newColumn);
  if (duplicate.length > 0) {
    return { error: "Duplicate storage" };
  }

  const currCol = foundUser[oldColumn];
  const columnIndex = columnData.findIndex((column) => column === oldColumn);
  columnData[columnIndex] = newColumn;
  const columnObj = {
    todos: currCol.todos ? currCol.todos : currCol,
    colour: currCol.colour,
  };
  await userTodos.updateMany({ username: user }, [
    { $set: { columnOrder: columnData } },
    { $set: { [newColumn]: columnObj } },
    { $unset: [oldColumn ? oldColumn : null] },
  ]);

  return { status: "Update successful" };
}
