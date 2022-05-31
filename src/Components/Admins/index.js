import List from './adminsList';
import styles from './admins.module.css';
import ModalAdmin from './ModalAdmin';
import { useState, useEffect } from 'react';

function Admins() {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const fetchAdmins = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/`)
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
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Admins</h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className={styles.addButton}
        >
          Add
        </button>
      </div>
      <div>
        <ModalAdmin
          showModal={showModal}
          setShowModal={setShowModal}
          setAdmins={setAdmins}
          fetchAdmins={fetchAdmins}
        />
        <List admins={admins} fetchAdmins={fetchAdmins} setAdmins={setAdmins} />
      </div>
      <div></div>
    </section>
  );
}

export default Admins;
