export const setItemInLocal = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItemFromLocal = (key) => {
  const obj = localStorage.getItem(key);
  return JSON.parse(obj);
};
