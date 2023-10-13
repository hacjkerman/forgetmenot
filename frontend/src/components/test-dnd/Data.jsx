import React, { useState, useEffect } from "react";
import { getTodos } from "../../api/Todosapi";

export default function Data() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await getTodos("dies34");
      console.log(request);
      setData([request]);
      return request;
    }
    fetchData();
  }, []);

  return <div></div>;
}
