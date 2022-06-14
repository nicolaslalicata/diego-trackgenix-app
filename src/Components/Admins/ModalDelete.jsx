import Modal from '../Shared/Modal';
import Button from '../Shared/Buttons/buttons';
import styles from './admins.module.css';

const ModalDelete = ({ setShowDeleteModal, showDeleteModal, deleteAdmin }) => {
  return (
    <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal}>
      <div>
        <h4>Are you sure you want to remove this administrator?</h4>
      </div>
      <div>
        <Button text={'Delete'} callback={deleteAdmin}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
