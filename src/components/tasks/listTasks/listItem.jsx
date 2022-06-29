import React from 'react';
import Button from 'components/shared/buttons';

const ListItem = ({ tasksItem }) => {
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
