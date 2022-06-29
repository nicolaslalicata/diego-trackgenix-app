import Modal from 'components/shared/modal';
import styles from './admins.module.css';

const ModalSuc = ({ setSucModalIsOpen, sucModalIsOpen }) => {
  return (
    <Modal isOpen={sucModalIsOpen} setIsOpen={setSucModalIsOpen} title={'Success'}>
      <h3 className={styles.heading}></h3>
      <div className={styles.modalContent}>Operation carried out successfully</div>
      <h3 className={styles.heading}></h3>
    </Modal>
  );
};

export default ModalSuc;
