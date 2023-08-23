import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function findUser(user, password) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("users");
  const userResult = await Users.findOne({
    username: user,
    password: password,
  });
  if (!userResult) {
    return false;
  }
  return userResult._id;
}
