export default function findColumn(foundObj, columnName) {
  const foundArray = Object.keys(foundObj);
  const foundColumn = foundArray.find((column) => column === columnName);
  if (foundColumn) {
    // COLUMN FOUND
    return true;
  }
  return false;
}
