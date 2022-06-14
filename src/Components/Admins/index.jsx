import Table from '../Shared/Table/Table';
import styles from './admins.module.css';
import { useState, useEffect } from 'react';
import Button from '../Shared/Buttons/buttons';
import ModalDelete from './ModalDelete';
import ModalAddAdmin from './AddModal';
import ModalEditAdmin from './EditModalAdmin';

function Admins() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState({});

  const fetchAdmins = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/`)
      .then((response) => response.json())
      .then((response) => setAdmins(response.data));
  };
  function deleteAdmin() {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${admin._id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(fetchAdmins)
      .then(() => setShowDeleteModal(false));
  }
  useEffect(async () => {
    try {
      await fetchAdmins();
    } catch (error) {
      console.error(error);
    }
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
    return admins.map((admin) => ({
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
          deleteAdmin={deleteAdmin}
          admin={admin}
          fetchAdmins={fetchAdmins}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        ></ModalDelete>
        <ModalAddAdmin
          setShowAddModal={setShowAddModal}
          showAddModal={showAddModal}
          fetchAdmins={fetchAdmins}
          admins={admins}
        ></ModalAddAdmin>
        <ModalEditAdmin
          setShowEditModal={setShowEditModal}
          showEditModal={showEditModal}
          fetchAdmins={fetchAdmins}
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

export default Admins;
