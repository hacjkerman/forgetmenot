import { dbConnect } from "../../database/db.js";

export async function newUserGen(user) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  if (foundUser) {
    return { error: "User already exists" };
  } else {
    const column = ["Habits", "Todo", "Done"];
    await userTodos.insertOne({ username: user, columnOrder: column });
    // await userTodos.updateMany({ username: user }, [
    //   { $set: { [column[0]]: [] } },
    //   { $set: { [column[1]]: [] } },
    //   { $set: { [column[2]]: [] } },
    //   { $set: { todoIndex: 0 } },
    // ]);
    await userTodos.updateMany({ username: user }, [
      {
        $set: { [column[0]]: { todos: Habits, colour: "Blue" } },
      },
      { $set: { [column[1]]: { todos: Todo, colour: "Red" } } },
      { $set: { [column[2]]: { todos: Done, colour: "Green" } } },
      { $set: { todoIndex: 8 } },
    ]);
    return { status: "New user" };
  }
}

const Habits = [
  {
    id: "6",
    todo: "Workout",
    due: "2023-11-27",
    done: false,
  },
  {
    id: "7",
    todo: "Skip rope for 1 hour",
    due: "2023-11-27",
    done: false,
  },
  {
    id: "2",
    todo: "Do Homework",
    due: "2023-11-27",
    done: false,
  },
];

const Todo = [
  {
    id: "3",
    todo: "Be Batman",
    due: null,
    done: false,
  },
  {
    id: "1",
    todo: "Wash the dishes",
    due: null,
    done: false,
  },
  {
    id: "4",
    todo: "Save the World",
    due: null,
    done: false,
  },
  {
    id: "5",
    todo: "Make a million dollars",
    due: "2024-05-04",
    done: false,
  },
];
const Done = [
  {
    id: "0",
    todo: "Walk the dog",
    due: "2023-11-24",
    done: true,
  },
];
