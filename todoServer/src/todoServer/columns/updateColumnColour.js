import { dbConnect } from "../../database/db.js";

export async function updateColumnColour(user, column, newColour) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({ username: user });
  if (!foundUser) {
    return { error: "User not found" };
  }
  const columnData = foundUser.columnOrder;
  const foundCol = columnData.filter((col) => col === column);
  if (foundCol.length === 0) {
    return { error: "Column does not exist" };
  }
  const newColumn = {
    todos: foundUser[column],
    colour: newColour,
  };
  await userTodos.updateOne(
    { username: user },
    { $set: { [column]: newColumn } }
  );

  return { status: "Update successful" };
}
