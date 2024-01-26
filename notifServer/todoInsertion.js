import { dbConnect } from "./db.js";

export default async function todoInsertion(newTodo) {
  const db = await dbConnect();
  const todoNotifs = db.collection("todoNotifs");
  const date = new Date(newTodo.due);
  const month = date.getMonth();
  const isFound = await todoNotifs.findOne({
    month: month,
  });
  console.log(isFound);
  if (!isFound) {
    await todoNotifs.insertOne({
      month: month,
      todos: [newTodo],
    });
    // USER DOES NOT EXIST
    return { error: "User does not exist" };
  }
}

todoInsertion({
  id: "1",
  todo: "Wash the dishes",
  due: new Date("2023-11-24"),
  done: false,
});
