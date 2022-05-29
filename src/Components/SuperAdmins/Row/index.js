import React from 'react';

function Row({ name, lastName, email, id, password }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
}

export default Row;
