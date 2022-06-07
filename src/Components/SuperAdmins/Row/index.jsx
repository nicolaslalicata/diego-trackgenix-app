import React from 'react';
// import styles from '../Row/row.module.css';
import Button from '../../Shared/Buttons/buttons';

function Row({ row, deleteRow }) {
  const handleDelete = () => {
    deleteRow(row._id);
    alert('Super admin deleted successfully');
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
          {/* <button className={styles.editButton}>Edit</button> */}
          <Button icons={'edit'} />
        </a>
      </td>
      <td>
        {/* <button className={styles.deleteButton} onClick={() => handleDelete(row._id)}>
          Delete
        </button> */}
        <Button
          icons={'delete'}
          callback={() => {
            handleDelete(row._id);
          }}
        />
      </td>
    </tr>
  );
}

export default Row;
