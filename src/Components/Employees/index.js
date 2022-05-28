// import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List/listEmployee';

function Employees() {
  // const [employees, saveEmployees] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:4000/employees`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       saveEmployees(response.data);
  //     });
  // }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        <List />
      </div>
    </section>
  );
}

export default Employees;
