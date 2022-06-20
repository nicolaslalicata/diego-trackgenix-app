import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, getProjects, editProject, deleteProject } from '../../redux/projects/thunks';
import Button from '../Shared/Buttons/buttons';
import Modal from '../Shared/Modal/index';
import Table from '../Shared/Table/Table';
import ManageItem from './ManageItem';
import Loader from '../Shared/Loading';
import styles from './projects.module.css';

function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projectsList);
  const isLoading = useSelector((state) => state.projects.loading);
  const [project, setProject] = useState({});
  const [modalCloseOpen, setModalCloseOpen] = useState(false);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalEditItemOpen, setModalEditItemOpen] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const addItem = async (userInput) => {
    await dispatch(addProject(userInput));
    setModalAddItemOpen(false);
    await dispatch(getProjects());
  };

  const editItem = async (userInput) => {
    await dispatch(editProject(userInput));
    setModalEditItemOpen(false);
    await dispatch(getProjects());
  };

  const deleteItem = async (userInput) => {
    await dispatch(deleteProject(userInput));
    setModalCloseOpen(false);
    await dispatch(getProjects());
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

  const getData = (projects) => {
    return projects.map((project) => ({
      ...project,
      startDate: new Date(project.startDate).toISOString().substr(0, 10),
      endDate: new Date(project.startDate).toISOString().substr(0, 10),
      edit: <Button icons="edit" callback={() => onEdit(project)} />,
      delete: <Button icons="delete" callback={() => onDelete(project)} />
    }));
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

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
            <Button icons="delete" callback={() => deleteItem(project)} />
            <Button text="cancel" callback={() => setModalCloseOpen(false)} />
          </div>
        </div>
      </Modal>
      <Button icons="add" callback={() => setModalAddItemOpen(true)} />
      <Table
        data={getData(projects)}
        objProp={['name', 'description', 'client', 'startDate', 'endDate', 'edit', 'delete']}
        headers={['Name', 'Description', 'Client', 'Start Date', 'End Date', 'Edit', 'Delete']}
      />
    </div>
  );
}

export default ProjectsList;
