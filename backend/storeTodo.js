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
export async function storeTodo(userId, name, todo, date) {
  await client.connect();
  const newTodo = createTodo(userId, name, todo, date);
  const db = client.db(dbName);
  const userID = userId.toString();
  const collection = db.collection(userID);
  const insertResult = await collection.insertOne(newTodo);
  console.log("Inserted documents =>", insertResult);
  return "done.";
}

storeTodo(3, "Adam", "Kill me", "2023-05-15")
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
