import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import "./taskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const fetchTasks = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch("https://task-master-qz24.onrender.com/api/tasks", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data); 
      } else {
        setError("Error fetching tasks");
      }
    } catch (err) {
      setError("Error fetching tasks: " + err.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Task ID is undefined or invalid");
      return;
    }

    try {
      const response = await fetch(`https://task-master-qz24.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      if (response.ok) {
        fetchTasks(); 
      } else {
        const errorData = await response.json();
        console.error("Error deleting task:", errorData.message);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterTasks(query, filter);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    filterTasks(searchQuery, newFilter);
  };

  const filterTasks = (query, filter) => {
    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filter !== "all") {
      filtered = filtered.filter((task) => task.priority === filter);
    }
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (filteredTasks.length === 0) {
    return <p>No Tasks added</p>;
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <FilterBar filter={filter} onFilterChange={handleFilterChange} />
      <div className="task-list">
        {filteredTasks.map((task) => (
          <Tasks key={task._id} task={task} onDelete={() => handleDelete(task._id)} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
