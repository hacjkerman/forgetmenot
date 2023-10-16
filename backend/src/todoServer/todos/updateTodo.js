import { dbClose, dbConnect } from "../../database/db.js";

export async function updateTodo(user, todos, todo, newTodo) {
  const db = await dbConnect();
  const collection = db.collection("userTodos");
  const todoIndex = todos.findIndex((todoList) => todoList.todo === todo);
  if (!todoIndex) {
    return false;
  }
  console.log(todoIndex);
  todos[todoIndex].todo = newTodo;
  const insertResult = await collection.updateOne(
    { username: user },
    { $set: { todos: todos } }
  );
  console.log("All Todos documents =>", insertResult);
  await dbClose();
  return insertResult;
}
