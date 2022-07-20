import React from 'react';
import styles from './input.module.css';

const InputControlled = ({ label, type, value, name, placeholder, register, required, error }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.labelContainer}>
        <label className={styles.label}>{label}</label>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          {...register(name, { required })}
          className={error ? styles.alert : styles.input}
        />
      </div>
      <div>
        <p className={styles.pInput}> {error?.message && error?.message}</p>
      </div>
    </div>
  );
};

export default InputControlled;
