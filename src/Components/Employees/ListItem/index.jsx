import React from 'react';
import styles from './index.module.css';
import Button from '../../Shared/Buttons/buttons';

const ListItem = ({ listItem, setEditItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(listItem._id, listItem.firstName);
  };
  const handleEdit = () => {
    setEditItem(listItem);
    console.log(listItem);
    alert(`Employee ${listItem.firstName} ready for edit`);
  };

  return (
    <tr>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>
        <Button
          callback={() => {
            handleDelete(listItem._id, listItem.firstName);
          }}
          icons={'delete'}
        />
      </td>
      <td className={styles.containerButton}>
        <Button
          callback={() => {
            handleEdit(listItem);
          }}
          icons={'edit'}
        />
      </td>
      <td>
        <Button
          callback={() => {
            console.log('hola');
          }}
          text={'Wenassssssssssss'}
        />
      </td>
    </tr>
  );
};
export default ListItem;
