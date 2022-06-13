import Modal from '../Shared/Modal';
import Button from '../Shared/Buttons/buttons';

const ModalDelete = ({ setShowDeleteModal, showDeleteModal, deleteAdmin }) => {
  return (
    <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal}>
      <div>
        <h2>Are you sure?</h2>
      </div>
      <Button text={'Add'} callback={deleteAdmin}>
        Delete
      </Button>
      <Button text={'Cancel'} callback={setShowDeleteModal(false)}>
        Cancel
      </Button>
    </Modal>
  );
};

export default ModalDelete;
