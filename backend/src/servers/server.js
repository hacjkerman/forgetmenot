import express from "express";
import "dotenv/config";
import { storeTodo } from "../todos/storeTodo.js";
// import { findTodo } from "../todos/findTodo.js";
import { getAllTodos } from "../todos/getAllTodos.js";
import { removeTodo } from "../todos/removeTodo.js";
import jwt from "jsonwebtoken";
import { updateTodo } from "../todos/updateTodo.js";
import { createUser } from "../users/createUser.js";
import { findUser } from "../users/findUser.js";
import { removeUser } from "../users/deleteUser.js";
import validator from "email-validator";

const { verify } = jwt;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

// Todo Request Operations
app.post("/storeTodo", async (req, res) => {
  const { username, password, todo, dueDate } = req.body;
  if (!username || !password || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, password);
  const foundTodos = await getAllTodos(userId);
  const storeResult = await storeTodo(userId, foundTodos, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

// // NOT NEEDED???
// app.get("/findTodo", async (req, res) => {
//   const { username, password, todo } = req.body;
//   if (!username || !password || !todo) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const userId = await findUser(username, password);
//   const foundTodo = await findTodo(userId, todo);
//   if (foundTodo === null) return res.sendStatus(404);
//   res.json(foundTodo);
// });

app.get("/getAllTodos", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, password);
  const foundTodos = await getAllTodos(userId);
  if (foundTodos === null) return res.sendStatus(404);
  res.json(foundTodos);
});

app.put("/updateTodo", async (req, res) => {
  const { username, password, todo, newTodo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const userId = await findUser(username, password);
  const foundTodo = await updateTodo(userId, todo, newTodo);
  if (foundTodo === null) return res.sendStatus(404);
  res.json("Hello");
});

app.delete("/removeTodo", async (req, res) => {
  const { username, password, todo } = req.body;
  if (!username || !password || !todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  const userId = await findUser(username, password);
  const foundTodos = await getAllTodos(userId);
  const removeResult = await removeTodo(userId, foundTodos, todo);
  if (removeResult === null) return res.sendStatus(404);
  res.json(`Removed Todo: ${todo}, Successfully.`);
});

// User Operations
app.post("/createUser", async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!validator.validate(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }
  const userId = await createUser({
    name,
    email,
    username,
    password,
  });
  if (userId === false) return res.status(400).json({ error: "Duplicate" });
  res.json(userId);
});

app.get("/findUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, password);
  res.json(userId);
});

app.delete("/removeUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, password);
  console.log(userId);
  const returnVal = await removeUser(userId);
  res.json(returnVal);
});

// JWT Operations
const posts = [
  {
    username: "Kyle",
    post: "Hello",
  },
  {
    username: "Jim",
    post: "Bye",
  },
  {
    username: "Andrew",
    post: "Yello",
  },
];
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
