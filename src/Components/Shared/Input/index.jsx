import React from 'react';
import styles from './input.module.css';

const Input = ({ text, type, value, placeholder, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{text}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
