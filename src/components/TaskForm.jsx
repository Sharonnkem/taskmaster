import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./taskForm.css";

const TaskForm = ({ onTaskAdded = () => {} }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    deadline: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://task-master-qz24.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onTaskAdded();
        setFormData({ title: "", description: "", priority: "low", deadline: "" });
        navigate("/tasklist");
      } else {
        const errorData = await response.json();
        console.error("Error adding task:", errorData.message);
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
