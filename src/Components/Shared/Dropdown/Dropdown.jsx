import React from 'react';
import styles from './dropdown.module.css';
const Dropdown = ({ label, value, options, onChange, initialOption }) => {
  return (
    <div className={styles.dropdownContainer}>
      <label className={styles.labelDropdown}>{label}</label>
      <select className={styles.selectDropdown} value={value} onChange={onChange}>
        <option value="none" selected hidden>
          {initialOption}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option._id || option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
