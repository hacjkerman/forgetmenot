import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";
// const currentDate1 = new Date();
// const currentDate2 = new Date();
// console.log(currentDate1);
// console.log("acsd", currentDate2);
// if (currentDate1.toString() === currentDate2.toString()) {
//   console.log("aevaervrever");
// }
function createTodo(userId, name, todo, date) {
  let newTodo = {
    id: userId,
    name: name,
    todo: todo,
    date: date,
  };
  return newTodo;
}
export async function storeTodo(todoObj) {
  await client.connect();
  const newTodo = createTodo(
    todoObj.userId,
    todoObj.name,
    todoObj.todo,
    todoObj.date
  );
  const db = client.db(dbName);
  const collection = db.collection("users");
  const insertResult = await collection.insertOne(newTodo);
  console.log("Inserted documents =>", insertResult);
  return "done.";
}
