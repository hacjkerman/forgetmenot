import React, { useEffect, useState } from "react";
import Column from "./Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardCSS from "./Board.module.css";
import NewColumn from "../Column/newColumn.jsx";
import styled from "styled-components";
import useSWR from "swr";
import {
  getColumns,
  removeColumn,
  storeColumn,
  todosUrlEndpoint,
  updateColumnOrder,
} from "../../api/Columnapi.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
  flex-wrap: nowrap;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  padding: 4px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 25px;
  margin-right: 20px;
`;

export default function Board(props) {
  const user = props.user;
  const [isTriggered, setIsTriggered] = useState(false);
  const headers = { username: user };
  const url = "http://localhost:8080/column/Order";
  const { data: columnOrder, mutate } = useSWR(
    [todosUrlEndpoint, headers],
    getColumns,
    {
      revalidateOnFocus: false,
    }
  );
  const addColumn = async (user, column, columnOrder) => {
    try {
      await storeColumn(user, column);
      const newArray = Array.from(columnOrder);

      newArray.push(column);
      mutate(newArray, false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteColumn = async (user, column, columnOrder) => {
    try {
      await removeColumn(user, column);

      const filteredArray = columnOrder.filter(
        (columnName) => columnName !== column
      );
      mutate(filteredArray, false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateColOrder = async (user, srcIndex, destIndex, columnOrder) => {
    try {
      const newColumnOrder = Array.from(columnOrder);
      const destItem = newColumnOrder[destIndex];
      newColumnOrder[destIndex] = newColumnOrder[srcIndex];
      newColumnOrder[srcIndex] = destItem;
      mutate(newColumnOrder, false);
      await updateColumnOrder(user, srcIndex, destIndex);
    } catch (err) {
      console.log(err);
    }
  };
  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    console.log(destination, source, type);
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
      // let newColumnOrder = Array.from(columnOrder);
      updateColOrder(user, source.index, destination.index, columnOrder);
      // let destItem = newColumnOrder[destination.index];
      // newColumnOrder[destination.index] = newColumnOrder[source.index];
      // newColumnOrder[source.index] = destItem;
      // const newState = { columns: newColumnOrder };
      // setData(newState);
      return;
    }
    // const start = source.droppableId;
    // const finish = destination.droppableId;

    // const newColumnOrder = Array.from(columnOrder);
    // const StartObj = data.columns.find((element) => element.id === start);
    // const StartIndex = data.columns.findIndex(
    //   (element) => element.id === start
    // );
    // const startTasks = StartObj.tasks;
    // const currDest = startTasks[destination.index];
    // const srcItem = startTasks[source.index];
    // if (start === finish) {
    //   startTasks[destination.index] = srcItem;
    //   startTasks[source.index] = currDest;
    //   const newColumn = { ...StartObj, tasks: startTasks };
    //   newColumnOrder[StartIndex] = newColumn;
    //   const newState = {
    //     // columns: newColumnOrder,
    //   };
    //   // setData(newState);
    //   return;
    // }
    // const DestObj = data.columns.find((element) => element.id === finish);
    // const DestIndex = data.columns.findIndex(
    //   (element) => element.id === finish
    // );

    // const newDestTasks = DestObj.tasks;
    // const newStartTasks = startTasks.filter((item) => item !== srcItem);
    // newDestTasks.splice(destination.index, 0, srcItem);

    // const newStartCol = { ...StartObj, tasks: newStartTasks };
    // const newDestCol = { ...DestObj, tasks: newDestTasks };
    // newColumnOrder[StartIndex] = newStartCol;
    // newColumnOrder[DestIndex] = newDestCol;

    // const newState = {
    //   columns: newColumnOrder,
    // };
    // setData(newState);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsTriggered(!isTriggered);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder &&
              columnOrder.map((column, index) => {
                return (
                  <Column
                    key={"column-" + column}
                    column={column}
                    index={index}
                    user={user}
                    columnOrder={columnOrder}
                    deleteColumn={deleteColumn}
                  />
                );
              })}
            {provided.placeholder}

            {isTriggered ? (
              <NewColumn
                trigger={isTriggered}
                setTrigger={setIsTriggered}
                addColumn={addColumn}
                user={user}
                columnOrder={columnOrder}
              ></NewColumn>
            ) : (
              <Button onClick={handleClick}>+</Button>
            )}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
