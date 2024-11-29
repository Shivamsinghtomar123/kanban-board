import React from 'react';
import './SortSelector.css';

const SortSelector = ({ value, onChange }) => {
  return (
    <div className="sort-selector-container">
      <label>Sort By</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="sort-selector"
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortSelector;