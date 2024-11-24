import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import "./taskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // All tasks fetched from the server
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks based on search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [hasFetchedTasks, setHasFetchedTasks] = useState(false); // Tracks if any tasks were fetched

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in fetch request
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data); // Initially show all tasks
        setHasFetchedTasks(data.length > 0); // Track if tasks exist
      } else {
        setError("Error fetching tasks");
        setHasFetchedTasks(false);
      }
    } catch (err) {
      setError("Error fetching tasks: " + err.message);
      setHasFetchedTasks(false);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in delete request
        },
      });

      if (response.ok) {
        fetchTasks(); // Refresh tasks after deletion
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

  if (!hasFetchedTasks) {
    return <p>No Tasks added</p>; // Only show if no tasks were fetched
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
      <FilterBar filter={filter} onFilterChange={handleFilterChange} />
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Tasks key={task._id} task={task} onDelete={() => handleDelete(task._id)} />
          ))
        ) : (
          <p>No tasks match your filter or search.</p> // Message for empty filter result
        )}
      </div>
    </div>
  );
};

export default TaskList;
