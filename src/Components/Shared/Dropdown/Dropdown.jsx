import React from 'react';
const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.description || option.firstName || option.name}
          </option>
        ))}
      </select>
    </label>
  );
};
export default Dropdown;
