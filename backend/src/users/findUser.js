import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function findTodo(user, password) {
  await client.connect();
  const db = client.db(dbName);
  const userID = user.toString();
  const userPass = password.toString();
  const collection = db.collection(userID);
  const userResult = await collection.find(
    { user: userID },
    { password: userPass }
  );
  const emailResult = await collection.find(
    { email: userID },
    { password: userPass }
  );
  if (!userResult || !emailResult) {
    return false;
  }
  return insertResult.userId;
}
