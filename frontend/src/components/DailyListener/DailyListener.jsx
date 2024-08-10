import {
  getItemFromLocal,
  setItemInLocal,
} from "../../helpers/offlineMethods/localInterface";

export const addListener = (todo) => {
  let array = getItemFromLocal("dailyListeners");
  if (!array) {
    array = [todo];
  } else {
    array.push(todo);
  }
  console.log(array);
  setItemInLocal("dailyListeners", array);
};

export const deleteListener = (todoId) => {
  const array = JSON.parse(getItemFromLocal("dailyListeners"));
  if (!array) {
    return;
  }
  const filteredArray = array.filter((item) => item.id !== todoId);
  setItemInLocal("dailyListeners", filteredArray);
};

export const updateListeners = (columns) => {
  const array = getItemFromLocal("dailyListeners");
  if (!array || !columns) {
    return columns;
  }
  for (const item of array) {
    columns[item.column].todos.map((todo) => {
      if (todo.id === item.id) {
        todo.done = false;
      }
      return columns;
    });
  }
  return columns;
};

// export const timeCheck = () => {
//   const time = new Date();
//   if (time.getHours() === 23 && time.getMinutes() >= 58) {
//     notifyListeners();
//   }
// };
