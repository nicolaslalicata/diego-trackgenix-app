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
  required,
  error
}) => {
  return (
    <div className={styles.dropdownContainer} style={dropStyle}>
      <label className={styles.labelDropdown}>{label}</label>
      <select className={styles.selectDropdown} value={value} {...register(name, { required })}>
        <option value="true" selected hidden>
          {initialOption}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option._id || option || option.name || option.description}
          </option>
        ))}
      </select>
      <p> {error?.message && error?.message}</p>
    </div>
  );
};
export default DropdownForm;
