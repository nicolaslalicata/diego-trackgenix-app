import List from './List';
import styles from './super-admins.module.css';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <div>
        <h2>SuperAdmins</h2>
        <List />
      </div>
    </section>
  );
}

export default SuperAdmins;
