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
// USING UPDATE TO DELETE
export async function removeTodo(userId, todos, todo) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("users");
  const filteredTodos = todos.filter((todoName) => todoName.todo !== todo);
  const insertResult = await collection.updateOne(
    { _id: userId },
    { $set: { todo: filteredTodos } }
  );
  console.log("Removed documents =>", insertResult);
  return true;
}
