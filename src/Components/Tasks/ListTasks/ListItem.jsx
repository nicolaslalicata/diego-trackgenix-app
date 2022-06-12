import React from 'react';
import Button from '../../Shared/Buttons/buttons';

const ListItem = ({ tasksItem, deleteItem }) => {
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
        <Button icons={'delete'}></Button>
      </td>
    </tr>
  );
};

export default ListItem;
