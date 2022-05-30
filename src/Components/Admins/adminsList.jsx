import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminItem from './eachAdmin';

function List() {
  const [Admins, setAdmins] = useState([]);
  const fetchAdmins = () => {
    fetch(`http://localhost:4000/admins`)
      .then((response) => response.json())
      .then((response) => setAdmins(response.data));
  };
  useEffect(async () => {
    try {
      await fetchAdmins();
    } catch (error) {
      console.error(error);
    }
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
          {Admins.map((admin) => {
            return (
              <AdminItem
                key={admin._id}
                admin={admin}
                setAdmins={setAdmins}
                fetchAdmins={fetchAdmins}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
