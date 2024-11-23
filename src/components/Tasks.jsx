import React from "react";
import "./tasks.css";

const Tasks = ({ task, onDelete }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Deadline: {task.deadline}</p>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Tasks;
