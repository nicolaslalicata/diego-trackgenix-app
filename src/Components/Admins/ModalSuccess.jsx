import styles from './admins.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Buttons/buttons';

const ModalSuc = ({ setSucModalIsOpen, sucModalIsOpen }) => {
  if (sucModalIsOpen) {
    return (
      <>
        <Modal>
          <h3 className={styles.heading}>Success</h3>
          <div className={styles.modalContent}>Operation carried out successfully</div>
        </Modal>
      </>
    );
  } else return false;
};

export default ModalSuc;
