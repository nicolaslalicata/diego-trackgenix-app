import React from 'react';
import Button from '../../Shared/Buttons/buttons';

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
          <Button icons={'edit'} />
        </a>
      </td>
      <td>
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
