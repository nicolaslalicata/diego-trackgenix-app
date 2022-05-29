import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function List() {
  const [Admins, saveAdmins] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/admins')
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Admins.map((admins) => {
            return (
              <tr key={admins._id}>
                <td>{admins._id}</td>
                <td>{admins.lastName}</td>
                <td>{admins.firstName}</td>
                <td>{admins.email}</td>
                <td>
                  <button className={styles.buttons}>Edit</button>
                </td>
                <td>
                  <button className={styles.buttons}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
