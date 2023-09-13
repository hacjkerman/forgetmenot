import { MongoClient } from "mongodb";
import axios from "axios";

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function findUser(user, sessionId) {
  const isValid = await axios({
    method: "get",
    url: "http://localhost:4000/verifyUser",
    data: {
      username: user,
      token: sessionId,
    },
  });

  if (!isValid.data) {
    return false;
  }
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("users");
  const userResult = await Users.findOne({
    username: user,
  });
  if (!userResult) {
    return false;
  }
  return userResult._id;
}
