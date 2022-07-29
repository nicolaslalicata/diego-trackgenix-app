import React from 'react';
import styles from './dropdown.module.css';
const DropdownForm = ({
  label,
  value,
  options,
  initialOption,
  dropStyle,
  register,
  name,
  onChange,
  required,
  error
}) => {
  return (
    <div className={styles.dropdownContainer} style={dropStyle}>
      <label className={styles.labelDropdown}>{label}</label>
      <select
        className={styles.selectDropdown}
        onChange={() => {
          onChange;
        }}
        value={value}
        {...register(name, { required })}
      >
        <option value="true" selected hidden>
          {initialOption}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option._id}>
            {option.name ||
              option.lastName ||
              option.description ||
              option ||
              option.emplopyeeId.lastName}
          </option>
        ))}
      </select>
      <p> {error?.message && error?.message}</p>
    </div>
  );
};
export default DropdownForm;
