// STEP 1 STORE ALL DATES FOR TODOS ON DATABASE AND PUT IN AN ARRAY

function notification(todos) {
  // STEP 2 ORGANISE THE ARRAY SO THAT INSERTION OF NEW TODOS WILL BE ORDERED FROM EARLIEST TO LATEST
  // DO PROPER INSERTION TO ENSURE TODOS ARE SORTED BEFORE BEING PASSED INTO THIS FUNCTION
  const sortedTodos = todos.sort(function (a, b) {
    return new Date(a.due) - new Date(b.due);
  });
  // STEP 3 ONLY POP THE TODO THAT WILL HAPPEN SOONEST SO FAST
  // STEP 4 SEND OUT POPPED TODO FROM ARRAY TO USERS EMAIL AND PHONE NUMBER
  // STEP 5 CONTINUE FOREVER
}

const todoList = [
  {
    id: "1",
    todo: "Wash the dishes",
    due: "2023-11-24",
    done: false,
  },
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
  {
    id: "3",
    todo: "Be Batman",
    due: "2024-01-01",
    done: false,
  },

  {
    id: "4",
    todo: "Save the World",
    due: "2032-12-31",
    done: false,
  },
];

notification(todoList);
