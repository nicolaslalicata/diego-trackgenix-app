import styles from './super-admins.module.css';
import List from './List';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      {/* <h2>SuperAdmins</h2> */}
      <div>
        <List />
      </div>
    </section>
  );
}

export default SuperAdmins;
