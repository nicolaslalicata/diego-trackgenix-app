import React from 'react';
import Button from '../../Shared/Buttons/buttons';

const ListItem = ({ tasksItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(tasksItem._id);
  };

  return (
    <tr>
      <td>{tasksItem._id}</td>
      <td>{tasksItem.description}</td>
      <td>{tasksItem.workedHours}</td>
      <td>{tasksItem.date}</td>
      <td>
        <Button icons={'edit'}></Button>
      </td>
      <td>
        <Button callback={() => handleDelete(tasksItem._id)} icons={'delete'}></Button>
      </td>
    </tr>
  );
};

export default ListItem;
