import React from 'react';
import styles from '../Row/row.module.css';

function Row({ row, deleteRow }) {
  const handleDelete = () => {
    deleteRow(row._id);
  };
  const url = `/super-admins/form?id=${row._id}`;
  return (
    <tr>
      <td>{row.firstName}</td>
      <td>{row.lastName}</td>
      <td>{row.email}</td>
      <td>{row.password}</td>
      <td>
        <a href={url}>
          <button className={styles.editButton}>Edit</button>
        </a>
      </td>
      <td>
        <button className={styles.deleteButton} onClick={() => handleDelete(row._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Row;
