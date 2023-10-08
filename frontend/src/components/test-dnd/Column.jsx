import React from "react";
import Task from "./Task.jsx";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: rgb(235, 236, 240);
  padding: 4px;
`;
const Title = styled.h3`
  padding: 8px;
  margin: 0;
  border-bottom: solid;
  background-color: dark-grey;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit "};
  flex-grow: 1;
  min-height: 150px;
`;

function InnerList(props) {
  return props.tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
}

export default function Column(props) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={props.tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
