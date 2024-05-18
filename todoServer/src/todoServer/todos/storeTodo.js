import { dbConnect } from "../../database/db.js";
import findColumn from "../columns/findColumn.js";

export async function storeTodo(
  username,
  column,
  todo,
  estimate,
  dueDate,
  colour
) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  let due;
  if (dueDate === 0) {
    due = undefined;
  }
  if (estimate === 0) {
    estimate = undefined;
  }
  const isFound = await userTodos.findOne({
    username: username,
  });
  if (!isFound) {
    // USER DOES NOT EXIST
    return { error: "User does not exist" };
  }
  if (todo.length > 256) {
    return { error: "Todo has to be less than 256 characters long" };
  }
  const newTodo = {
    id: isFound.todoIndex.toString(),
    todo,
    estimate,
    due,
    colour,
    done: false,
  };
  const foundCol = findColumn(isFound, column);
  if (!foundCol) {
    // COLUMN DOES NOT EXIST
    return { error: "Column does not exist" };
  }
  // UPDATING COMPLETELY BAD SOLUTION SHOULD FIX IN FUTURE
  const todos = isFound[foundCol].todos;
  todos.push(newTodo);
  const newObj = {
    todos: todos,
    colour: isFound[foundCol].colour,
  };
  // FIGURE OUT HOW TO UPDATE A NESTED ARRAY IN AN OBJECT
  await userTodos.updateOne(
    { username: username },
    { $set: { [column]: newObj }, $inc: { todoIndex: 1 } }
  );
  return { status: "Storage successful" };
}
