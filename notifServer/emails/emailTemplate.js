export function emailTemplate(username, todos, date) {
  const pendingTodos = [];
  const lateTodos = [];
  const doneTodos = [];
  const upcomingTodos = [];
  todos.forEach((todo) => {
    const todoDate = new Date(todo.due);
    const month = todoDate.getUTCMonth() + 1; // months from 1-12
    const day = todoDate.getUTCDate();
    const year = todoDate.getUTCFullYear();
    const currTodoDate = year + "/" + month + "/" + day;
    if (todo.done === true) {
      let li = `<li class="completed">`;
      li = li + "Todo: " + todo.todo + " has been completed. Well Done!!</li>";
      doneTodos.push(li);
      return;
    }
    if (todo.done === false && currTodoDate < date) {
      let li = `<li class="late">`;
      li =
        li +
        "Todo: " +
        todo.todo +
        " is late since " +
        currTodoDate +
        ". Either move it forward or get rid of it! </li>";
      lateTodos.push(li);
    } else if (todo.done === false && currTodoDate > date) {
      let li = `<li class="upcoming"> `;
      li = li + "Todo: " + todo.todo + " due on: " + currTodoDate + " </li>";
      upcomingTodos.push(li);
    } else {
      let li = `<li class="pending">`;
      li = li + "Todo: " + todo.todo + " due today. Better get onto it! </li>";
      pendingTodos.push(li);
    }
  });
  return `<!DOCTYPE html>\
<html lang="en">\
\
<head>\
  <meta charset="UTF-8">\
  <meta name="viewport" content="width=device-width, initial-scale=1.0">\
  <title>Your Daily ToDo Digest for ${date} - ${username}</title>\
  <style>\
    body {\
      font-family: Arial, sans-serif;\
      line-height: 1.6;\
      background-color: #f4f4f4;\
      color: #333;\
      margin: 0;\
      padding: 20px;\
    }\
\
    h2 {\
      color: #007bff;\
    }\
\
    .task-list {\
      margin: 10px 0;\
      padding: 10px;\
      background-color: #fff;\
      border-radius: 5px;\
    }\
\
    .late {\
      color: #123xwa;\
    }\
\
    .completed {\
      color: #28a745;\
    }\
\
    .pending {\
      color: #ffc107;\
    }\
\
    .upcoming {\
      color: #007bff;\
    }\
  </style>\
</head>\
\
<body>\
  <h2>Your Daily ToDo Digest for ${date} - ${username}</h2>\
\
  <div class="task-list">\
    <h3>Late Tasks:</h3>\
    
    <ul>\
    ${lateTodos}
    </ul>\
  </div>\
\
  <div class="task-list">\
    <h3>Completed Tasks:</h3>\
    
    <ul>\
    ${doneTodos}
    </ul>\
  </div>\
\
  <div class="task-list">\
    <h3>Pending Tasks (Due Today):</h3>\
    <ul>\
    ${pendingTodos}
    </ul>\
  </div>\
\
  <div class="task-list">\
    <h3>Upcoming Tasks:</h3>\
    <ul>\
    ${upcomingTodos}
    </ul>\
  </div>\
\
  <p>Feel free to reach out if you have any questions or need assistance with your tasks. Keep up the great work!</p>\
\
  <p>Best regards,<br>\
    [Your Name]<br>\
    [Your Position]<br>\
    [Your Contact Information]</p>\
</body>\
\
</html>\
`;
}
