import React, { useState } from "react";
import Column from "./Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-left: 3rem;
`;

export default function Board(props) {
  const data = props.data;
  const setData = props.setData;
  const onDragEnd = (result) => {
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";
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
      let newColumnOrder = Array.from(data.columns);
      let destItem = newColumnOrder[destination.index];
      newColumnOrder[destination.index] = newColumnOrder[source.index];
      newColumnOrder[source.index] = destItem;
      const newState = { columns: newColumnOrder };
      setData(newState);
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;

    const newColumnOrder = Array.from(data.columns);
    const StartObj = data.columns.find((element) => element.id === start);
    const StartIndex = data.columns.findIndex(
      (element) => element.id === start
    );
    const startTasks = StartObj.tasks;
    const currDest = startTasks[destination.index];
    const srcItem = startTasks[source.index];
    if (start === finish) {
      startTasks[destination.index] = srcItem;
      startTasks[source.index] = currDest;
      const newColumn = { ...StartObj, tasks: startTasks };
      newColumnOrder[StartIndex] = newColumn;
      const newState = {
        columns: newColumnOrder,
      };
      setData(newState);
      return;
    }
    const DestObj = data.columns.find((element) => element.id === finish);
    const DestIndex = data.columns.findIndex(
      (element) => element.id === finish
    );

    const newDestTasks = DestObj.tasks;
    const newStartTasks = startTasks.filter((item) => item !== srcItem);
    newDestTasks.splice(destination.index, 0, srcItem);

    const newStartCol = { ...StartObj, tasks: newStartTasks };
    const newDestCol = { ...DestObj, tasks: newDestTasks };
    newColumnOrder[StartIndex] = newStartCol;
    newColumnOrder[DestIndex] = newDestCol;

    const newState = {
      columns: newColumnOrder,
    };
    setData(newState);
  };

  //   onDragStart = (start) => {
  //     document.body.style.color = "orange";
  //     document.body.style.transition = "background-color 0.2s ease";
  //   };

  //   onDragUpdate = (update) => {
  //     const { destination } = update;
  //     const opacity = destination
  //       ? destination.index / Object.keys(data.tasks).length
  //       : 0;
  //     document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
  //   };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      // onDragStart={this.onDragStart}
      // onDragUpdate={this.onDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columns.map((column, index) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={column.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
