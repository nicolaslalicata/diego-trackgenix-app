import React from 'react';
import Button from '../../Shared/Buttons/buttons';

const ListItem = ({ tasksItem, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(tasksItem._id);
  };

  let date = tasksItem.date;

  let newDate = new Date(date).toISOString().substr(0, 10);
  console.log(newDate);

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
