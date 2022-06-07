import { useState, useEffect } from 'react';
import Button from '../Shared/Buttons/buttons';
import Modal from '../Shared/Modal/Modal';
import Table from '../Shared/Table/Table';
import ManageItem from './ManageItem';
import styles from './projects.module.css';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [modalCloseOpen, setModalCloseOpen] = useState(false);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalEditItemOpen, setModalEditItemOpen] = useState(false);

  const fetchProjects = () => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
      });
  };

  useEffect(() => {
    try {
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addItem = (userInput) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then(() => {
          fetchProjects();
          setModalAddItemOpen(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = (userInput) => {
    // eslint-disable-next-line no-unused-vars
    const { _id, __v, ...other } = userInput;
    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(other),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then(() => {
          fetchProjects();
          setModalEditItemOpen(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = () => {
    const params = { method: 'delete' };
    const id = project._id;

    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, params).then(() => {
        setModalCloseOpen(false);
        fetchProjects();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = (project) => {
    const projectWithUpdatedDates = {
      ...project,
      startDate: new Date(project.startDate).toISOString().substr(0, 10),
      endDate: new Date(project.endDate).toISOString().substr(0, 10)
    };
    setModalEditItemOpen(true);
    setProject(projectWithUpdatedDates);
  };

  const onDelete = (project) => {
    setModalCloseOpen(true);
    setProject(project);
  };

  const getData = () => {
    return projects.map((project) => ({
      ...project,
      startDate: new Date(project.startDate).toISOString().substr(0, 10),
      endDate: new Date(project.startDate).toISOString().substr(0, 10),
      edit: <Button icons="edit" callback={() => onEdit(project)} />,
      delete: <Button icons="delete" callback={() => onDelete(project)} />
    }));
  };

  return (
    <div className={styles.container}>
      <Modal isOpen={modalAddItemOpen} setIsOpen={setModalAddItemOpen}>
        <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Create project</h5>
        </div>
        <ManageItem handler={addItem} />
      </Modal>
      <Modal isOpen={modalEditItemOpen} setIsOpen={setModalEditItemOpen}>
        <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Change information</h5>
        </div>
        <ManageItem project={project} handler={editItem} />
      </Modal>
      <Modal isOpen={modalCloseOpen} setIsOpen={setModalCloseOpen}>
        <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Confirmation</h5>
        </div>
        <div>Are you sure you want to delete the item?</div>
        <div className={styles.modalActions}>
          <div className={styles.actionsContainer}>
            <button className={styles.deleteBtn} onClick={deleteItem}>
              Delete
            </button>
            <button className={styles.cancelBtn} onClick={() => setModalCloseOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Button icons="add" callback={() => setModalAddItemOpen(true)} />
      <Table
        data={getData()}
        headers={['name', 'description', 'client', 'startDate', 'endDate', 'edit', 'delete']}
      />
    </div>
  );
}

export default ProjectsList;
