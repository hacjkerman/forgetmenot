import express from "express";
import "dotenv/config";
import { storeTodo } from "../todos/storeTodo.js";
import { findTodo } from "../todos/findTodo.js";
import { getAllTodos } from "../todos/getAllTodos.js";
import { removeTodo } from "../todos/removeTodo.js";
import jwt from "jsonwebtoken";
import { updateTodo } from "../todos/updateTodo.js";
import { createUser } from "../users/createUser.js";
import { findUser } from "../users/findUser.js";

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
  await storeTodo({ username, password }, { todo, dueDate });
  res.json("Successful");
});

app.get("/findTodo", async (req, res) => {
  const { user, todo } = req.body;
  if (!user || !todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const foundTodo = await findTodo(user, todo);
  if (foundTodo === null) return res.sendStatus(404);
  res.json({ todo: foundTodo.todo });
});

app.get("/getAllTodos", async (req, res) => {
  const foundTodos = await getAllTodos(todo);
  if (foundTodos === null) return res.sendStatus(404);
  return foundTodos;
});

app.put("/updateTodo", async (req, res) => {
  const { user, todo, newTodo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const foundTodo = await updateTodo(user, todo, newTodo);
  if (foundTodo === null) return res.sendStatus(404);
  res.json({ todo: foundTodo.todo });
});

app.delete("/removeTodo", async (req, res) => {
  const { user, todo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const foundTodo = await removeTodo(user, todo);
  if (foundTodo === null) return res.sendStatus(404);
  res.json({ todo: foundTodo.todo });
});

// User Operations
app.post("/createUser", async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await createUser({
    userId: 2,
    name,
    email,
    username,
    password,
  });
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
