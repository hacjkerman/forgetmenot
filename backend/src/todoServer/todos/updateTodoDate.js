import { dbClose, dbConnect } from "../../database/db.js";

export async function updateTodoDate(user, todos, column, todo, newDate) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.todo === todo);
  todos[todoIndex].due = newDate;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: todos } }
  );
  console.log("All Todos documents =>", insertResult);
  await dbClose();
  return insertResult;
}
