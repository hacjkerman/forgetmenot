import { dbClose, dbConnect } from "../../database/db.js";

export async function createNewColumn(username, column) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const isFound = await userTodos.findOne({
    username: username,
  });
  if (!isFound) {
    userTodos.insertOne({ username: username, columnOrder: [column] });
    return true;
  }
  if (isFound) {
    const duplicateTodo = isFound.columnOrder.find(
      (column) => column === column
    );
    if (duplicateTodo) {
      return false;
    }
  }
  await userTodos.updateOne(
    { username: username },
    { $push: { columnOrder: column } }
  );
  await dbClose();
  return true;
}
