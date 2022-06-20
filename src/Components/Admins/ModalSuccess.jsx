import Modal from '../Shared/Modal';
import styles from './admins.module.css';

const ModalSuc = ({ setSucModalIsOpen, sucModalIsOpen }) => {
  return (
    <Modal isOpen={sucModalIsOpen} setIsOpen={setSucModalIsOpen}>
      <h3 className={styles.heading}>Success</h3>
      <div className={styles.modalContent}>Operation carried out successfully</div>
    </Modal>
  );
};

export default ModalSuc;
