import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbName = "mydb";

export async function createUser(user) {
  await client.connect();
  const newUser = {
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password,
    todo: [],
  };
  const db = client.db(dbName);
  const collection = db.collection("users");
  // ISSUE - WILL INSERT DUPLICATE USERS. FIX FOR LATER
  const foundCursor = collection.find({
    $or: [{ username: newUser.username }, { email: newUser.email }],
  });
  const foundArray = await foundCursor.toArray();
  if (foundArray.length === 0) {
    const insertResult = await collection.insertOne(newUser);
    console.log("Created user =>", insertResult);
    await client.close();
    return insertResult.insertedId;
  }
  return undefined;
}
