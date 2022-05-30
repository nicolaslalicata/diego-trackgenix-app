import React from 'react';

function Row({ row, deleteRow }) {
  const handleDelete = () => {
    deleteRow(row._id);
  };

  return (
    <tr>
      <td>{row._id}</td>
      <td>{row.firstName}</td>
      <td>{row.lastName}</td>
      <td>{row.email}</td>
      <td>{row.password}</td>
      <td>
        <a href="/super-admins/form">
          <button>Edit</button>
        </a>
      </td>
      <td>
        <button onClick={() => handleDelete(row._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Row;
