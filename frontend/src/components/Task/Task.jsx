import React from "react";
import image from "./images.jfif";
import "./task.css";

export default function Task(props) {
  return (
    <div className="wrapper">
      <div className="upper-box">
        <img src={image} alt="pfp" id="pfp" />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{" "}
        </p>
      </div>
      <div className="lower-box">
        <p id="dueDate">Due Date: {props.date}</p>
        <p id="propId">#{props.id}</p>
      </div>
    </div>
  );
}
