import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import initialData from "./components/test-dnd/initial-data";
import Header from "./components/Header/Header";
// import LoginContainer from "./components/Login/LoginContainer";
import Board from "./components/test-dnd/Board";
import Data from "./components/test-dnd/Data";
import storeColumn from "./components/Column/storeColumn";
import removeColumn from "./components/Column/removeColumn";
import updateColumn from "./components/Column/updateColumn";

function App() {
  const [data, setData] = useState(initialData);
  console.log(data);
  useEffect(() => {}, [setData]);
  return (
    <div className={AppCSS.main}>
      <Header />
      <Board data={data} setData={setData} />
      <Data setData={setData} />
      {/* <LoginContainer /> */}
    </div>
  );
}

export default App;
