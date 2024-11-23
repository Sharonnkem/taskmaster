import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
    </div>
  );
};

export default SearchBar;
