import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function createUser(user) {
  await client.connect();
  const newUser = {
    userId: user.userId,
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password,
    todo: [],
  };
  const db = client.db(dbName);
  const collection = db.collection("users");
  const insertResult = await collection.insertOne(newUser);
  console.log("Created user =>", insertResult);
  return newUser.userId;
}
