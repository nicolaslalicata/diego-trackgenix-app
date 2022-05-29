import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Admins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        {admins.map((admin) => {
          return (
            <div
              key={admin.id}
              firstName={admin.firstName}
              lastName={admin.lastName}
              email={admin.email}
              gender={admin.gender}
              active={admin.active}
              paswword={admin.password}
            ></div>
          );
        })}
      </div>
    </section>
  );
}

export default Admins;
