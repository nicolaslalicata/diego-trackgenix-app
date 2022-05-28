import { useEffect, useState } from 'react';
//import Employees from '../Employee';
import style from '../List/list.module.css';

const List = () => {
  const [Employees, saveEmployees] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  return (
    <div className={style.container}>
      <table className={style.tab}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Active</th>
            {/* <th>Password</th> */}
          </tr>
        </thead>
        <tbody>
          {Employees.map((employees) => {
            return (
              <tr key={employees._id}>
                <th>{employees.first_Name}</th>
                <th>{employees.last_Name}</th>
                <th>{employees.phone}</th>
                <th>{employees.email}</th>
                <th>{employees.active}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
