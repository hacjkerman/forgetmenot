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

export async function updateTodo(user, todo, newTodo) {
  await client.connect();
  const db = client.db(dbName);
  const userID = userId.toString();
  const collection = db.collection(userID);
  const insertResult = await collection.updateOne(
    { todo: todo },
    { $set: { todo: newTodo } }
  );
  console.log("All Todos documents =>", insertResult);
  return "done.";
}

updateTodo(3, "Kill you", "Kill me")
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
