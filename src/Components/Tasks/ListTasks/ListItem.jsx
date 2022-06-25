import React from 'react';
import Button from '../../Shared/Buttons/buttons';

const ListItem = ({ tasksItem }) => {
  console.log('aca', tasksItem.workedHours);
  return (
    <tr>
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
