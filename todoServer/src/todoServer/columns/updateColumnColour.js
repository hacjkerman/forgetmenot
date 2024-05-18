import { dbConnect } from "../../database/db.js";

export async function updateColumnColour(foundUser, user, column, newColour) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const currCol = foundUser[column];
  const newColumn = {
    todos: currCol.todos ? currCol.todos : currCol,
    colour: newColour,
  };
  await userTodos.updateOne(
    { username: user },
    { $set: { [column]: newColumn } }
  );

  return { status: "Update successful" };
}
