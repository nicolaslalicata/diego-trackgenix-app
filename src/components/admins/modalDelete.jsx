import Modal from 'components/shared/modal';
import Button from 'components/shared/buttons';
import { useDispatch } from 'react-redux';
import { deleteAdmin } from 'redux/admins/thunks';

const ModalDelete = ({ setShowDeleteModal, showDeleteModal, admin }) => {
  const dispatch = useDispatch();
  return (
    <Modal isOpen={showDeleteModal} setIsOpen={setShowDeleteModal} title={'Delete Admin'}>
      <div>
        <h4>Are you sure you want to remove this administrator?</h4>
      </div>
      <div>
        <Button
          text={'Delete'}
          callback={() => {
            deleteAdmin(admin)(dispatch).then(() => {
              setShowDeleteModal(false);
            });
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
