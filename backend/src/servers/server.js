import express from "express";
import "dotenv/config";
// import { storeTodo } from "./storeTodo.js";
// import { findTodo } from "./todos/findTodo.js";
// import { findAllTodos } from "./getAllTodos.js";
// import { removeTodo } from "./removeTodo.js";
import jwt from "jsonwebtoken";

const { verify } = jwt;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/storeTodo", async (req, res) => {
  const { name, todo, dueDate } = req.body;
  if (!name || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  await storeTodo({ userId: 0, name, todo, dueDate });
  res.json("Successful");
});
app.get("/findTodo", (req, res) => {});
app.get("/getAllTodos", (req, res) => {});
app.put("/updateTodo", (req, res) => {});
app.delete("/removeTodo", (req, res) => {});

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
