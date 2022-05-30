import List from './adminsList';
import styles from './admins.module.css';
import ModalAdmin from './ModalAdmin';
import { useState } from 'react';

function Admins() {
  const [modal, setModal] = useState(false);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Admins</h2>
        <button
          onClick={() => {
            setModal(!modal);
          }}
          className={styles.addButton}
        >
          Add
        </button>
      </div>
      <div>
        <ModalAdmin modal={modal} setModal={setModal} />
        <List />
      </div>
      <div></div>
    </section>
  );
}

export default Admins;
