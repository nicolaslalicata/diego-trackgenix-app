import React from 'react';
import styles from './index.module.css';

const ListItem = ({ listItem, setEditItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id);
  };
  const handleEdit = () => {
    setEditItem(listItem);
  };

  return (
    <tr>
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
      <td className={styles.containerButton}>
        <button onClick={() => handleEdit(listItem)}>Edit</button>
      </td>
    </tr>
  );
};
export default ListItem;
