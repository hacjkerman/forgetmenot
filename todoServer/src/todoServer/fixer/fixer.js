import { dbConnect } from "../../database/db.js";

export async function fixer() {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const found = await userTodos.find({}).toArray();
  for (let items of found) {
    const currentUser = items;
    const columnOrder = currentUser.columnOrder;
    for (let column of columnOrder) {
      currentUser[column] = {
        todos: currentUser[column].todos
          ? currentUser[column].todos
          : currentUser[column],
        colour: currentUser[column].colour
          ? currentUser[column].colour
          : "Default",
      };
      await userTodos.replaceOne(
        { username: currentUser.username },
        currentUser
      );
    }
  }
  console.log("updating done");
  console.log(found);
}
