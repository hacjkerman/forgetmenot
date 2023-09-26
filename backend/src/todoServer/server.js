import express from "express";
import "dotenv/config";
import { storeTodo } from "./todos/storeTodo.js";
import { getAllTodos } from "./todos/getAllTodos.js";
import { removeTodo } from "./todos/removeTodo.js";
import { updateTodo } from "./todos/updateTodo.js";
import { verifyUser } from "./users/verifyUser.js";
import { createUserTodo } from "./todos/createUserTodo.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Todo Request Operations
app.post("/createUserTodo", async (req, res) => {
  const { username, column, sessionId, todo, dueDate } = req.body;
  if (!username || !column || !sessionId || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, sessionId);
  if (!validUser) {
    return res.json("Invalid authorisation");
  }
  const storeResult = await createUserTodo(username, column, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});
app.post("/todos", async (req, res) => {
  const { username, sessionId, todo, dueDate } = req.body;
  if (!username || !sessionId || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, sessionId);
  if (!validUser) {
    return res.json("Invalid authorisation");
  }
  const foundTodos = await getAllTodos(username);
  const storeResult = await storeTodo(username, foundTodos, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

app.get("/todos", async (req, res) => {
  const { username, sessionId } = req.query;
  if (!username || !sessionId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, sessionId);
  if (!validUser) {
    return res.json("Invalid authorisation");
  }
  const foundTodos = await getAllTodos(username);
  if (foundTodos === null) return res.sendStatus(404);
  res.json(foundTodos);
});

// app.get("/findUser", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//   const validUser = await findUser(username, password);
//   res.json(validUser);
// });

app.put("/todos", async (req, res) => {
  const { username, sessionId, todo, newTodo } = req.body;
  if (!username || !sessionId || !todo || !newTodo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, sessionId);
  if (!validUser) {
    return res.json("Invalid authorisation");
  }
  const foundTodos = await getAllTodos(username);
  const updatedTodo = await updateTodo(username, foundTodos, todo, newTodo);
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.delete("/todos", async (req, res) => {
  const { username, sessionId, todo } = req.body;
  if (!username || !sessionId || !todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  const validUser = await verifyUser(username, sessionId);
  if (!validUser) {
    return res.json("Invalid authorisation");
  }
  const foundTodos = await getAllTodos(username);
  const removeResult = await removeTodo(username, foundTodos, todo);
  if (removeResult === false) return res.sendStatus(404);
  else {
    res.json(`Removed Todo: ${todo}, Successfully.`);
  }
});

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
