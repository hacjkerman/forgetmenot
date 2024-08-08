export const addListener = (todo) => {
  let array;
  if (!JSON.parse(localStorage.getItem("dailyListeners"))) {
    array = [todo];
    return;
  } else {
    array = JSON.parse(localStorage.setItem("dailyListeners"));
    array.push(todo);
  }
  localStorage.setItem("dailyListeners", JSON.parse(array));
};

export const deleteListener = (todoId) => {
  const array = JSON.parse(localStorage.getItem("dailyListeners"));
  if (!array) {
    return;
  }
  const filteredArray = array.filter((item) => item.id !== todoId);
  localStorage.setItem("dailyListeners", JSON.parse(filteredArray));
};

const notifyListeners = () => {
  const array = JSON.parse(localStorage.getItem("dailyListeners"));
  if (!array) {
    return;
  }
  array.map((item) => (item.done = false));
  console.log(array);
};

export const timeCheck = () => {
  const time = new Date();
  console.log(time);
  if (time.getHours() === 23 && time.getMinutes() >= 58) {
    notifyListeners();
  }
};
