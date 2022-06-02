import React from 'react';
import ListItem from '../ListItem';
import styles from './index.module.css';

const ListEmployee = ({ Employees, setEditItem, deleteItem }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.trItem}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {Employees.map((item) => {
            return (
              <ListItem
                key={item._id}
                listItem={item}
                setEditItem={setEditItem}
                deleteItem={deleteItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ListEmployee;
