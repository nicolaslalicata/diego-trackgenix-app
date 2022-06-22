import React from 'react';
import styles from './input.module.css';

const Input = ({ labelText, name, type, value, placeholder, onChange, onClick, inputStyle }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        style={inputStyle}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  );
};

export default Input;
