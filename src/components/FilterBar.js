import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filter, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={filter === "low" ? "active" : ""}
        onClick={() => onFilterChange("low")}
      >
        Low Priority
      </button>
      <button
        className={filter === "medium" ? "active" : ""}
        onClick={() => onFilterChange("medium")}
      >
        Medium Priority
      </button>
      <button
        className={filter === "high" ? "active" : ""}
        onClick={() => onFilterChange("high")}
      >
        High Priority
      </button>
    </div>
  );
};

export default FilterBar;
