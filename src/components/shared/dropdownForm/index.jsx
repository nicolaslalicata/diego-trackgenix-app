import React from 'react';
import styles from './dropdown.module.css';
const DropdownForm = ({
  label,
  value,
  options,
  initialOption,
  dropStyle,
  register,
  onChange,
  name,
  required,
  error
}) => {
  return (
    <div className={styles.dropdownContainer} style={dropStyle}>
      <label className={styles.labelDropdown}>{label}</label>
      <select
        onChange={onChange}
        className={styles.selectDropdown}
        defaultValue={''}
        value={value}
        {...register(name, { required })}
      >
        <option value={''} disabled>
          {initialOption}
        </option>

        {options.map((option, index) => (
          <option key={index} value={option?._id}>
            {option.name || option.lastName || option.description || option.employeeId._id}
          </option>
        ))}
      </select>
      <p className={styles.error}> {error?.message && error?.message}</p>
    </div>
  );
};
export default DropdownForm;
