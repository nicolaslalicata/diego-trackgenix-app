import List from './adminsList';
import styles from './admins.module.css';

function Admins() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Admins</h2>
        <button className={styles.addButton}>Add</button>
      </div>
      <div>
        <List />
      </div>
    </section>
  );
}

export default Admins;
