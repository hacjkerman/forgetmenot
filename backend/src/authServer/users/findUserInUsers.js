import { MongoClient } from "mongodb";
import axios from "axios";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function findUserInUsers(user) {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("users");
  const userResult = await Users.findOne({
    username: user,
  });
  if (!userResult) {
    return false;
  }
  return userResult;
}

findUserInUsers("dies34");
