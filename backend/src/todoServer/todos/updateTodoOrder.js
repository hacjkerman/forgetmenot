import { dbConnect } from "../../database/db.js";

export async function updateTodoColumn(
  user,
  oldColumn,
  srcIndex,
  destIndex,
  newColumn
) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.id === todoId);
  if (todoIndex < 0) {
    // INDEX DOES NOT EXIST
    return false;
  }
  todos[todoIndex].todo = newTodo;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { [column]: todos } }
  );
  return insertResult;
}
