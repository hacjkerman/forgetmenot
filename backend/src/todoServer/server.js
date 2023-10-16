import express from "express";
import "dotenv/config";
import { storeTodo } from "./todos/storeTodo.js";
import { getAllTodos } from "./todos/getAllTodos.js";
import { removeTodo } from "./todos/removeTodo.js";
import { updateTodo } from "./todos/updateTodo.js";
import { verifyUser } from "./users/verifyUser.js";
import { updateTodoColumn } from "./todos/updateTodoColumn.js";
import { updateTodoDate } from "./todos/updateTodoDate.js";
import { createNewColumn } from "./columns/createNewColumn.js";
import { updateColumn } from "./columns/updateColumn.js";
import { storeColumn } from "./columns/storeColumn.js";
import { getColumns } from "./columns/getColumns.js";
import { removeColumn } from "./columns/removeColumn.js";
import { createUserTodo } from "./todos/createUserTodo.js";
import cors from "cors";
import { validateColumn } from "./columns/validateColumn.js";

const app = express();
app.use(cors());
app.use(express.json());
// Column Request Operations
app.post("/createNewColumn", async (req, res) => {
  const { username, column } = req.body;
  if (!username || !column) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const storeResult = await createNewColumn(username, column);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json({ msg: "Update Successful" });
});

app.put("/column/Order", async (req, res) => {
  const { username, srcIndex, destIndex } = req.body;
  if (!username || !srcIndex || !destIndex) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (srcIndex === destIndex) {
    return;
  }
  const updateResult = await updateOrder(username, srcIndex, destIndex);
  if (updateResult === false) {
    return res.status(400).json({ error: "Bad Storage" });
  }
  return res.json({ msg: "Update Successful" });
});
app.put("/column", async (req, res) => {
  const { username, oldColumn, newColumn } = req.body;
  if (!username || !oldColumn || !newColumn) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const updateResult = await updateColumn(username, oldColumn, newColumn);
  if (updateResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json({ msg: "Update Successful" });
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
  return res.json({ msg: "Update Successful" });
});

app.get("/column", async (req, res) => {
  const { username } = req.query;
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
    res.json({ msg: "Removed Todo: " + column + ", Successfully." });
  }
});
// Todo Request Operations
app.post("/todo", async (req, res) => {
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
  return res.json({ msg: "Update Successful" });
});

app.get("/todo", async (req, res) => {
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

app.put("/todo", async (req, res) => {
  const { username, column, todo, newTodo } = req.body;
  if (!username || !todo || !newTodo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const validColumn = await validateColumn(username, column);
  if (!validColumn) {
    return res.status(400).json({ error: "Column does not exist" });
  }
  const foundTodos = await getAllTodos(username);
  const filteredTodos = foundTodos.filter((todo) => todo.column === column);
  console.log(filteredTodos);
  const updatedTodo = await updateTodo(username, filteredTodos, todo, newTodo);
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.put("/todo/Column", async (req, res) => {
  const { username, todo, newColumn } = req.body;
  if (!username || !todo || !newColumn) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const validColumn = await validateColumn(username, newColumn);
  if (!validColumn) {
    return res.status(400).json({ error: "Column does not exist" });
  }
  const foundTodos = await getAllTodos(username);
  const updatedTodo = await updateTodoColumn(
    username,
    foundTodos,
    todo,
    newColumn
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.put("/todo/Date", async (req, res) => {
  const { username, column, todo, newDate } = req.body;
  if (!username || !column || !todo || !newDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getAllTodos(username);
  const updatedTodo = await updateTodoDate(
    username,
    foundTodos,
    column,
    todo,
    newDate
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.delete("/todo", async (req, res) => {
  const { username, column, todo } = req.body;
  if (!username || !column || !todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const validColumn = await validateColumn(username, column);
  if (!validColumn) {
    return res.status(400).json({ error: "Column does not exist" });
  }
  const foundTodos = await getAllTodos(username);
  const removeResult = await removeTodo(username, column, foundTodos, todo);
  if (removeResult === false) return res.sendStatus(404);
  else {
    res.json(`Removed Todo: ${todo}, Successfully.`);
  }
});

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
