import React from 'react';
import styles from './input.module.css';

const Input = ({ labelText, name, type, value, placeholder, onChange, onClick }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  );
};

export default Input;
