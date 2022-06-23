import React from 'react';
import styles from './input.module.css';

const InputControlled = ({ label, type, value, name, placeholder, register, required, error }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        {...register(name, { required })}
        className={error ? styles.alert : styles.input}
      />
      <p> {error?.message && error?.message}</p>
    </div>
  );
};

export default InputControlled;
