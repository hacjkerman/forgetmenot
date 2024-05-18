import { dbConnect } from "../../database/db.js";
import { updateColumnColour } from "./updateColumnColour.js";

export async function updateColumn(user, oldColumn, colour, newColumn) {
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
  if (oldColumn === newColumn) {
    const response = await updateColumnColour(
      foundUser,
      user,
      oldColumn,
      colour
    );
    return response;
  } else {
    const duplicate = columnData.filter((column) => column === newColumn);
    if (duplicate.length > 0) {
      return { error: "Duplicate storage" };
    }
  }
  const currCol = foundUser[oldColumn];
  let columnObj = {
    todos: currCol.todos ? currCol.todos : currCol,
    colour: colour,
  };
  const columnIndex = columnData.findIndex((column) => column === oldColumn);
  columnData[columnIndex] = newColumn;

  await userTodos.updateMany({ username: user }, [
    { $set: { columnOrder: columnData } },
    { $set: { [newColumn]: columnObj } },
    { $unset: [oldColumn ? oldColumn : null] },
  ]);

  return { status: "Update successful" };
}
