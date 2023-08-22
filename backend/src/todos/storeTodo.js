import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function storeTodo(userObj, todoObj) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("users");
  const userResult = await Users.find({}).toArray();
  console.log(userResult);
  const newTodo = {
    todo: todoObj.todo,
    dueDate: todoObj.date,
  };
  // TODO find out why its not working
  Users.update(
    {
      username: userObj.username,
      password: userObj.password,
    },
    { $push: { todo: newTodo } }
  );
  console.log("Inserted documents =>", insertResult);
  return;
}
