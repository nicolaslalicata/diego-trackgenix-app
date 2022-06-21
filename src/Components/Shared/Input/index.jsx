import React from 'react';
import styles from './input.module.css';

const Input = ({ label, name, register, required, error }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input {...register(name, { required })} />
      <p> {error?.message && error?.message}</p>
    </div>
  );
};

export default Input;
