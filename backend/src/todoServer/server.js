import express from "express";
import "dotenv/config";
import { getAllTodos } from "./todos/getAllTodos.js";
import { removeTodo } from "./todos/removeTodo.js";
import { updateTodo } from "./todos/updateTodo.js";
import { verifyUser } from "./users/verifyUser.js";
import { updateTodoColumn } from "./todos/updateTodoColumn.js";
import { updateTodoDate } from "./todos/updateTodoDate.js";
import { updateColumn } from "./columns/updateColumn.js";
import { storeColumn } from "./columns/storeColumn.js";
import { getColumns } from "./columns/getColumns.js";
import { removeColumn } from "./columns/removeColumn.js";
import { storeTodo } from "./todos/storeTodo.js";
import cors from "cors";
import { validateColumn } from "./columns/validateColumn.js";
import { getColumnOrder } from "./columns/getColumnOrder.js";

const app = express();
app.use(cors());
app.use(express.json());
// Column Request Operations

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
  // CHANGE TO BODY IF BACKEND TESTING
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundColumns = await getColumns(username);
  if (foundColumns === null) return res.sendStatus(404);
  res.json(foundColumns);
});

app.get("/column/Order", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundColumns = await getColumnOrder(username);
  if (foundColumns === null) return res.sendStatus(404);
  res.json(foundColumns);
});

app.delete("/column", async (req, res) => {
  const { username, column } = req.body;
  console.log(username, column);
  if (!username || !column) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }

  const removeResult = await removeColumn(username, column);
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
  const storeResult = await storeTodo(username, column, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json({ msg: "Update Successful" });
});

app.get("/todo", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING ELSE QUERY
  const { username, column } = req.query;
  if (!username || !column) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
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
  const { username, column, todoId, newTodo } = req.body;
  if (!username || !todoId || !newTodo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const updatedTodo = await updateTodo(
    username,
    column,
    foundTodos,
    todoId,
    newTodo
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.put("/todo/Column", async (req, res) => {
  const { username, column, todoId, newColumn } = req.body;
  if (!username || !column || !todoId || !newColumn) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }

  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const updatedTodo = await updateTodoColumn(
    username,
    column,
    foundTodos,
    todoId,
    newColumn
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.put("/todo/Date", async (req, res) => {
  const { username, column, todoId, newDate } = req.body;
  if (!username || !column || !todoId || !newDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }
  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const updatedTodo = await updateTodoDate(
    username,
    column,
    foundTodos,
    todoId,
    newDate
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.delete("/todo", async (req, res) => {
  const { username, column, todoId } = req.body;
  if (!username || !column || !todoId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  // const validUser = await verifyUser(username, sessionId);
  // if (!validUser) {
  //   return res.json("Invalid authorisation");
  // }

  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const removeResult = await removeTodo(username, column, foundTodos, todoId);
  if (removeResult === false) return res.sendStatus(404);
  else {
    res.json(`Removed Todo Num: ${todoId}, Successfully.`);
  }
});

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
