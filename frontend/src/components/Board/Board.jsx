import React, { useState, useContext, useEffect } from "react";
import Column from "../Column/Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NewColumn from "../Column/newColumn.jsx";
import styled from "styled-components";
import useSWR from "swr";
import data from "../../data/data.json";
import {
  addColMutation as storeColumn,
  addColOptions,
  delColMutation as removeColumn,
  delColOptions,
  updateColMutation as updateColumn,
  updateColOptions,
  updateColOrderMutation as updateColumnOrder,
  updateColOrderOptions,
  ColumnMethods,
} from "../../helpers/onlineMethods/columnsMutations.jsx";
import {
  addTodoMutation as storeTodo,
  addTodoOptions,
  delTodoMutation as removeTodo,
  delTodoOptions,
  updateTodoMutation as updateTodo,
  updateTodoOptions,
  updateTodoOrderMutation as updateTodoOrder,
  updateTodoOrderOptions,
  updateTodoEstimateMutation as updateTodoEstimate,
  updateTodoEstimateOptions,
  updateTodoDateMutation as updateTodoDate,
  updateTodoDateOptions,
  TodoMethods,
} from "../../helpers/onlineMethods/todosMutations.jsx";
import { getColumns } from "../../api/Columnapi.jsx";
import { updateTodoDone } from "../../api/Todosapi.jsx";
import { TodoContext } from "../../contexts/TodoContext.js";
import { UserContext } from "../../contexts/UserContext.js";
import { colours } from "../../features/colourSwatch/components/colourWheel/colours.jsx";
import {
  connectionDecorator,
  offAddCol,
  offDelCol,
  offlineColMethods,
  offUpdateCol,
  offUpdateColOrder,
  validConnection,
} from "../../helpers/offlineMethods/columnMethods.jsx";
import {
  offAddTodo,
  offDelTodo,
  offlineTodoMethods,
  offUpdateTodo,
  offUpdateTodoDate,
  offUpdateTodoDone,
  offUpdateTodoEstimate,
} from "../../helpers/offlineMethods/todoMethods.jsx";
import { updateListeners } from "../DailyListener/DailyListener.jsx";
import {
  getItemFromLocal,
  setItemInLocal,
} from "../../helpers/offlineMethods/localInterface.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.5rem;
  flex-wrap: nowrap;
  width: fit-content;
  height: 95%;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  cursor: pointer;
  display: flex;
  font-size: 200%;
  margin-top: 0.5rem;
`;
const onlineCol = new ColumnMethods();
const onlineTodo = new TodoMethods();
const offlineCol = new offlineColMethods();
const offlineTodo = new offlineTodoMethods();
export default function Board() {
  const { user, token, isOnline } = useContext(UserContext);
  const [isAddingEnd, setIsAddingEnd] = useState(false);
  const [allColumns, setAllColumns] = useState();
  const [columnMethods, setColumnMethods] = useState(offlineCol);
  const [todoMethods, setTodoMethods] = useState(offlineTodo);
  useEffect(() => {
    setAllColumns(getItemFromLocal("todos") ? getItemFromLocal("todos") : data);
  }, []);
  const headers = { username: user, token, type: "column" };
  const { data: columns, mutate } = useSWR([headers], getColumns);
  // useEffect(() => {
  //   if (columns) {
  //     if (columns.error) {
  //       return;
  //     }

  //     setItemInLocal("todos", columns);
  //   }
  // }, [columns]);

  useEffect(() => {
    const utc = Math.floor(new Date().getTime() / 1000);
    console.log(utc);
    if (!getItemFromLocal("storedTime")) {
      setItemInLocal("storedTime", utc);
      return;
    }
    const time = new Date();
    const timeBeforeMidnight = 23 - time.getHours();
    const minutesBeforeMidnight = 60 - time.getMinutes();
    const delay = timeBeforeMidnight * 3600000 + minutesBeforeMidnight * 60000;
    console.log(delay / 1000);
    function updateAllListeners(utc) {
      const updated = updateListeners(getItemFromLocal("todos"));
      setItemInLocal("todos", updated);
      setItemInLocal("storedTime", utc);
      fetch();
    }
    const storedTime = getItemFromLocal("storedTime");
    console.log(utc - storedTime);
    if (utc - storedTime >= 86400) {
      updateAllListeners(utc);
    }
    setInterval(function () {
      updateAllListeners(utc);
    }, delay);
  }, []);

  useEffect(() => {
    if (isOnline) {
      setColumnMethods(onlineCol);
      setTodoMethods(onlineTodo);
    } else {
      setColumnMethods(offlineCol);
      setTodoMethods(offlineTodo);
    }
  }, [isOnline]);
  const fetch = () => {
    setAllColumns(getItemFromLocal("todos") ? getItemFromLocal("todos") : data);
  };
  // COLUMN API CALLS
  const addColumn = async (column, colour, currCol) => {
    try {
      await offAddCol(column, currCol, colour, allColumns);
      fetch();
    } catch (err) {
      console.log(err);
    }
    //   try {
    //     const newColumns = { ...columns };
    //     console.log(column, colour, currCol);
    //     await mutate();
    //     // storeColumn(user, column, colour, currCol, token, newColumns),
    //     // addColOptions(column, currCol, colour, newColumns)
    //   } catch (err) {
    //     console.log(err);
    //   }
  };
  const deleteColumn = async (column) => {
    try {
      console.log(column);
      await offDelCol(column, allColumns);
      fetch();
    } catch (err) {
      console.log(err);
    }
    //   try {
    //     const newColumns = { ...columns };
    //     await mutate(
    //       removeColumn(user, column, newColumns, token),
    //       delColOptions(column, newColumns)
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  const changeColumn = async (column, colour, newColumn) => {
    try {
      offUpdateCol(column, colour, newColumn, allColumns);
      fetch();
    } catch (err) {
      console.log(err);
    }
    //   try {
    //     const newColumns = { ...columns };
    //     await mutate(
    //       updateColumn(user, column, colour, newColumn, newColumns, token),
    //       updateColOptions(column, colour, newColumn, newColumns)
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  const updateColOrder = async (user, srcIndex, destIndex) => {
    try {
      offUpdateColOrder(srcIndex, destIndex, allColumns);
      fetch();
    } catch (err) {
      console.log(err);
    }
    //   try {
    //     const newColumns = { ...columns };
    //     await mutate(
    //       updateColumnOrder(user, srcIndex, destIndex, newColumns, token),
    //       updateColOrderOptions(srcIndex, destIndex, newColumns)
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
  };
  // TODO API CALLS
  const addTodo = async (column, todo, estimate, due, daily, colour) => {
    try {
      const newTodo = {
        id: allColumns.todoIndex.toString(),
        todo,
        estimate,
        due,
        daily,
        colour,
        done: false,
      };
      offAddTodo(newTodo, column, allColumns);
      fetch();
    } catch (err) {
      console.log(err);
    }
    //   try {
    //     const newColumns = { ...columns };
    //     const newTodo = {
    //       id: columns.todoIndex.toString(),
    //       todo,
    //       estimate,
    //       due,
    //       colour,
    //       done: false,
    //     };
    //     await mutate(
    //       storeTodo(user, column, todo, estimate, due, colour, token, newColumns),
    //       addTodoOptions(newTodo, column, newColumns)
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  const deleteTodo = async (column, todo) => {
    try {
      offDelTodo(column, todo, allColumns);
      fetch();
      //     const newColumns = { ...columns };
      //     await mutate(
      //       removeTodo(user, column, todo, newColumns, token),
      // delTodoOptions(column, todo, newColumns)
      //     );
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoOrder = async (
    user,
    oldColumn,
    srcIndex,
    destIndex,
    newColumn
  ) => {
    try {
      offUpdateColOrder(srcIndex, destIndex, oldColumn, newColumn, allColumns);
      fetch();
      //     const newColumns = { ...columns };
      //     await mutate(
      //       updateTodoOrder(
      //         user,
      //         oldColumn,
      //         newColumn,
      //         srcIndex,
      //         destIndex,
      //         newColumns,
      //         token
      //       ),
      // updateTodoOrderOptions(
      //         srcIndex,
      //         destIndex,
      //         oldColumn,
      //         newColumn,
      //         newColumns
      //       )
      // );
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodo = async (column, todo, newTodo, newColour) => {
    try {
      offUpdateTodo(column, todo, newTodo, newColour, allColumns);
      fetch();
      //     const newColumns = { ...columns };
      //     await mutate(
      //       updateTodo(user, column, todo, newTodo, newColour, newColumns, token),
      //       updateTodoOptions(column, todo, newTodo, newColour, newColumns)
      //     );
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoDone = async (column, todo) => {
    try {
      offUpdateTodoDone(column, todo, allColumns);
      fetch();
      // await updateTodoDone(user, column, todo, token);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoEstimate = async (column, todo, newEstimate) => {
    try {
      offUpdateTodoEstimate(column, todo, newEstimate, allColumns);
      fetch();
      //     const newColumns = { ...columns };
      //     await mutate(
      //       updateTodoEstimate(user, column, todo, newEstimate, newColumns, token),
      //       updateTodoEstimateOptions(column, todo, newEstimate, newColumns)
      //     );
    } catch (err) {
      console.log(err);
    }
  };
  const changeTodoDate = async (column, todo, newDate) => {
    try {
      console.log(column, todo, newDate);
      offUpdateTodoDate(column, todo, newDate, allColumns);
      fetch();
      //     const newColumns = { ...columns };
      //     await mutate(
      //       updateTodoDate(user, column, todo, newDate, newColumns, token),
      //       updateTodoDateOptions(column, todo, newDate, newColumns)
      //     );
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      updateColOrder(user, source.index, destination.index);
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;

    changeTodoOrder(user, start, source.index, destination.index, finish);
    return;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsAddingEnd(!isAddingEnd);
  };

  return (
    <TodoContext.Provider
      value={{
        addColumn,
        deleteColumn,
        changeColumn,
        updateColOrder,
        addTodo,
        deleteTodo,
        changeTodoOrder,
        changeTodo,
        changeTodoDone,
        changeTodoDate,
        changeTodoEstimate,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {allColumns &&
                allColumns.columnOrder.map((column, index) => {
                  let todos = allColumns[column];
                  if (!Array.isArray(todos) && allColumns[column]) {
                    todos = allColumns[column].todos;
                  }
                  const currCol = allColumns[column];
                  let colColour = "#EBECF0";
                  if (currCol !== undefined && currCol.colour !== undefined) {
                    colColour = colours[currCol.colour]
                      ? colours[currCol.colour]
                      : currCol.colour;
                  }
                  return (
                    <Column
                      className=""
                      key={column}
                      column={column}
                      colour={colColour}
                      index={index}
                      todos={todos}
                      columnOrder={allColumns.columnOrder}
                    />
                  );
                })}
              {provided.placeholder}

              {isAddingEnd ? (
                <NewColumn
                  isAddingEnd={isAddingEnd}
                  setIsAddingEnd={setIsAddingEnd}
                  columnOrder={allColumns.columnOrder}
                  currCol={allColumns.columnOrder.length}
                ></NewColumn>
              ) : (
                <Button onClick={handleClick}>+</Button>
              )}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </TodoContext.Provider>
  );
}
