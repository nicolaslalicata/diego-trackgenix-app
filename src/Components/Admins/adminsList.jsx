import styles from './admins.module.css';
import AdminItem from './eachAdmin';

function List({ admins, setAdmins, fetchAdmins }) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
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
