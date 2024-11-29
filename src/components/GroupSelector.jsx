import React from 'react';
import './GroupSelector.css';

const GroupSelector = ({ value, onChange }) => {
  return (
    <div className="group-selector-container">
      <label>Group By</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="group-selector"
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupSelector;