import React, { useState } from "react";
import initialData from "./initial-data";
import Column from "./Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function InnerList(props) {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
}

export default function Board() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId, type } = result;
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
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
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
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={data.tasks}
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
