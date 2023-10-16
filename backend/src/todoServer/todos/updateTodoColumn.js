import { dbClose, dbConnect } from "../../database/db.js";

export async function updateTodoColumn(user, todos, todo, newColumn) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.todo === todo);
  if (!todoIndex) {
    return false;
  }
  todos[todoIndex].column = newColumn;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: todos } }
  );
  console.log("All Todos documents =>", insertResult);
  await dbClose();
  return insertResult;
}
