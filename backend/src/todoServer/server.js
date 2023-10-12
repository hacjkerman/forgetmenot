import express from "express";
import "dotenv/config";
import { storeTodo } from "./todos/storeTodo.js";
import { getAllTodos } from "./todos/getAllTodos.js";
import { removeTodo } from "./todos/removeTodo.js";
import { updateTodo } from "./todos/updateTodo.js";
import { verifyUser } from "./users/verifyUser.js";
import { createNewColumn } from "./columns/createNewColumn.js";
import { updateColumn } from "./columns/updateColumn.js";
import { storeColumn } from "./columns/storeColumn.js";
import { getColumns } from "./columns/getColumns.js";
import { removeColumn } from "./columns/removeColumn.js";
import { createUserTodo } from "./todos/createUserTodo.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
// Column Request Operations
app.post("/createNewColumn", async (req, res) => {
  const { username, column } = req.body;
  if (!username || !column) {
    return res.status(400).json({ error: "missing required fields" });
  }
  const storeResult = await createNewColumn(username, column);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

app.put("/column", async (req, res) => {
  const { username, oldColumn, newColumn } = req.body;
  if (!username || !oldColumn || !newColumn) {
    return res.status(400).json({ error: "missing requried fields" });
  }
  const updateResult = await updateColumn(username, oldColumn, newColumn);
  if (updateResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

app.post("/column", async (req, res) => {
  const { username, column } = req.body;
  if (!username || !column) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const storeResult = await storeColumn(username, column);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

app.get("/column", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getColumns(username);
  if (foundTodos === null) return res.sendStatus(404);
  res.json(foundTodos);
});

app.delete("/column", async (req, res) => {
  const { username, column } = req.body;
  if (!username || !column) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundColumns = await getColumns(username);
  const removeResult = await removeColumn(username, foundColumns, column);
  if (removeResult === false) return res.sendStatus(404);
  else {
    res.json(`Removed Todo: ${column}, Successfully.`);
  }
});
// Todo Request Operations
app.post("/createUserTodo", async (req, res) => {
  const { username, column, todo, dueDate } = req.body;
  if (!username || !column || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const storeResult = await createUserTodo(username, column, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});
app.post("/todos", async (req, res) => {
  const { username, todo, dueDate } = req.body;
  if (!username || !sessionId || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getAllTodos(username);
  const storeResult = await storeTodo(username, foundTodos, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

app.get("/todos", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
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
  const { username, column, todo, newTodo } = req.body;
  if (!username || !column || !todo || !newTodo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getAllTodos(username);
  const updatedTodo = await updateTodo(
    username,
    column,
    foundTodos,
    todo,
    newTodo
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.delete("/todos", async (req, res) => {
  const { username, column, todo } = req.body;
  if (!username || !column || !todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
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
