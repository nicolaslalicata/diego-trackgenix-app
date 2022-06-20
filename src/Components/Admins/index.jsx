import Table from '../Shared/Table/Table';
import styles from './admins.module.css';
import { useState, useEffect } from 'react';
import Button from '../Shared/Buttons/buttons';
import ModalDelete from './ModalDelete';
import ModalAddAdmin from './AddModal';
import ModalEditAdmin from './EditModalAdmin';
import Loader from '../Shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from '../../redux/admins/thunks';
import ModalSuc from './ModalSuccess';

function Admins() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sucModalIsOpen, setSucModalIsOpen] = useState(false);
  const [admins] = useState([]);
  const [admin, setAdmin] = useState({});

  const dispatch = useDispatch();
  const adminsRedux = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);

  useEffect(async () => {
    getAdmins()(dispatch);
  }, []);

  const onEdit = (admin) => {
    setAdmin(admin);
    setShowEditModal(true);
  };

  const onDelete = (admin) => {
    setAdmin(admin);
    setShowDeleteModal(true);
  };

  const getData = () => {
    return adminsRedux.map((admin) => ({
      ...admin,
      edit: (
        <Button
          icons="edit"
          callback={() => {
            onEdit(admin);
          }}
        />
      ),
      delete: (
        <Button
          icons="delete"
          callback={() => {
            onDelete(admin);
          }}
        />
      )
    }));
  };
  if (isLoading) {
    return <Loader isLoading={isLoading}></Loader>;
  } else {
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>Admins</h2>
          <div className={styles.addAdminButton}>
            <Button
              icons={'add'}
              callback={() => {
                setShowAddModal(true);
              }}
            />
          </div>
        </div>
        <div>
          <ModalDelete
            admin={admin}
            setShowDeleteModal={setShowDeleteModal}
            showDeleteModal={showDeleteModal}
          ></ModalDelete>
          <ModalAddAdmin
            setSucModalIsOpen={setSucModalIsOpen}
            setShowAddModal={setShowAddModal}
            showAddModal={showAddModal}
            admins={admins}
          ></ModalAddAdmin>
          <ModalSuc
            setSucModalIsOpen={setSucModalIsOpen}
            sucModalIsOpen={sucModalIsOpen}
          ></ModalSuc>
          <ModalEditAdmin
            setSucModalIsOpen={setSucModalIsOpen}
            setShowAddModal={setShowAddModal}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
            admin={admin}
          ></ModalEditAdmin>
          <Table
            data={getData()}
            headers={['First Name', 'Last name', 'Email', 'Edit', 'Delete']}
            objProp={['firstName', 'lastName', 'email', 'edit', 'delete']}
          />
        </div>
      </section>
    );
  }
}

export default Admins;
