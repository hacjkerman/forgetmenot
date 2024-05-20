import { getUserObj } from "../database/getUserObj.js";
export async function storeTodo(user, column, todo, estimate, dueDate, colour) {
  const { db, foundUser, foundCol } = await getUserObj(user, column);
  if (!foundUser) return { error: "User not found" };
  if (!foundCol) return { error: "Column does not exist" };
  if (!db) return { error: "Database not connected" };
  const userTodos = db.collection("userTodos");
  let due = dueDate;
  if (dueDate === 0) {
    due = undefined;
  }
  let estim = estimate;
  if (estimate === 0) {
    estim = undefined;
  }
  if (todo.length > 256) {
    return { error: "Todo has to be less than 256 characters long" };
  }
  const newTodo = {
    id: foundUser.todoIndex.toString(),
    todo,
    estimate: estim,
    due,
    colour,
    done: false,
  };

  // UPDATING COMPLETELY BAD SOLUTION SHOULD FIX IN FUTURE
  const todos = foundUser[foundCol].todos
    ? foundUser[foundCol].todos
    : foundUser[foundCol];
  todos.push(newTodo);
  const newObj = {
    todos: todos,
    colour: foundUser[foundCol].colour,
  };
  // FIGURE OUT HOW TO UPDATE A NESTED ARRAY IN AN OBJECT
  await userTodos.updateOne(
    { username: user },
    { $set: { [column]: newObj }, $inc: { todoIndex: 1 } }
  );
  return { status: "Storage successful" };
}
