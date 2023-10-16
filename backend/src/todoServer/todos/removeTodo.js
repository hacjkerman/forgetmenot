import { dbClose, dbConnect } from "../../database/db.js";

export async function removeTodo(user, column, todos, todo) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const isFound = todos.filter((todoName) => todoName.column === column);
  if (isFound.length === 0) {
    // COLUMN DOES NOT EXIST
    return false;
  }
  const filteredTodos = todos.filter((todoName) => todoName.todo !== todo);
  if (filteredTodos.length === todos.length) {
    // TODO DOES NOT EXIST
    return false;
  }

  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: filteredTodos } }
  );
  console.log("Removed documents =>", insertResult);
  await dbClose();
  return true;
}
