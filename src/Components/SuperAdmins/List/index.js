import { useState, useEffect } from 'react';
import React from 'react';
import Row from '../Row';
import style from '../List/list.module.css';

function List() {
  const [superAdmins, setSuperAdmins] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmins(response.data);
      });
  }, []);
  return (
    <div className={style.container}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((superAdmin) => {
            return (
              <>
                <Row
                  key={superAdmin._id}
                  id={superAdmin._id}
                  name={superAdmin.firstName}
                  lastName={superAdmin.lastName}
                  email={superAdmin.email}
                  password={superAdmin.password}
                />
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
