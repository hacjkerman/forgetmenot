import { Resend } from "resend";
import "dotenv/config";
import { getAllUsers } from "./apis/users/getAllUsers.js";
import { emailTemplate } from "./emails/emailTemplate.js";
import { getAllTodos } from "./apis/todos/getAllTodos.js";
// STEP 1 STORE ALL DATES FOR TODOS ON DATABASE AND PUT IN AN ARRAY
const resend = new Resend(process.env.RESEND_APIKEY);
// daily digest instead of single todos
export async function dailyDigest() {
  const allUsers = await getAllUsers();
  if (!allUsers) {
    return;
  }
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const currDate = year + "/" + month + "/" + day;
  console.log(currDate);
  Promise.all(
    allUsers.map(async (values) => {
      const email = values.email;
      const username = values.username;
      const todos = await getAllTodos(username);
      const emailHtml = emailTemplate(username, todos, currDate);
      console.log(emailHtml);
      const { data, error } = await resend.emails.send({
        from: "notifications@forgetmenot.lol",
        to: email,
        subject:
          username + "'s todo list for " + currDate + " and the coming week(s)",
        html: emailHtml,
      });
      if (error) {
        return console.error({ error });
      }
      console.log({ data });
    })
  );
}

function specificTodos(todos, user, email) {
  // STEP 2 ORGANISE THE ARRAY SO THAT INSERTION OF NEW TODOS WILL BE ORDERED FROM LATEST TO EARLIEST
  // DO PROPER INSERTION TO ENSURE TODOS ARE SORTED BEFORE BEING PASSED INTO THIS FUNCTION

  // STEP 3 ONLY POP THE TODO THAT WILL HAPPEN SOONEST SO FAST
  // STEP 4 SEND OUT POPPED TODO FROM ARRAY TO USERS EMAIL AND PHONE NUMBER
  // STEP 5 CONTINUE FOREVER

  const sortedTodos = todos.sort(function (a, b) {
    return new Date(b.due) - new Date(a.due);
  });
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
