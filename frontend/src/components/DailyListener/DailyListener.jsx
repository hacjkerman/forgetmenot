import { offUpdateTodoDone } from "../../helpers/offlineMethods/todoMethods";
export const addListener = (todo) => {
  let array = JSON.parse(localStorage.getItem("dailyListeners"));
  if (!array) {
    array = [todo];
  } else {
    array.push(todo);
  }
  console.log(array);
  localStorage.setItem("dailyListeners", JSON.stringify(array));
};

export const deleteListener = (todoId) => {
  const array = JSON.parse(localStorage.getItem("dailyListeners"));
  if (!array) {
    return;
  }
  const filteredArray = array.filter((item) => item.id !== todoId);
  localStorage.setItem("dailyListeners", JSON.stringify(filteredArray));
};

export const notifyListeners = (columns) => {
  const array = JSON.parse(localStorage.getItem("dailyListeners"));
  if (!array) {
    return;
  }
  for (const item of array) {
    columns[item.column].todos.map((todo) => {
      if (todo.id === item.id) {
        todo.done = false;
      }
      return columns;
    });
  }
  localStorage.setItem("todos", JSON.stringify(columns));
};

// export const timeCheck = () => {
//   const time = new Date();
//   if (time.getHours() === 23 && time.getMinutes() >= 58) {
//     notifyListeners();
//   }
// };
