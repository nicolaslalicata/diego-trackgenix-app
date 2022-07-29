import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, getProjects, editProject, deleteProject } from 'redux/projects/thunks';
import { useForm } from 'react-hook-form';
import Button from 'components/shared/buttons';
import Modal from 'components/shared/modal';
import Table from 'components/shared/table';
import ManageItem from 'components/projects/manageItemEdit';
import ManageItemAdd from 'components/projects/manageItemAdd';
import Loader from 'components/shared/loading';
import styles from './projects.module.css';
import * as membersThunks from 'redux/members/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { ButtonOption } from 'components/shared/buttonsOption';

const arrayRoles = ['QA', 'Dev', 'PM'];

function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projectsList);
  const isLoading = useSelector((state) => state.projects.loading);
  console.log('isLoading', isLoading);
  const [project, setProject] = useState();
  const [modalCloseOpen, setModalCloseOpen] = useState(false);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalEditItemOpen, setModalEditItemOpen] = useState(false);
  const [modalNotification, setModalNotification] = useState(false, { title: '' });
  const [selectedEmployee, setSelectedEmployee] = useState({ role: '', rate: '', employeeId: '' });
  const [modalAddMemberOpen, setModalAddMemberOpen] = useState(false);
  const employeesList = useSelector((state) => state.employees.employeesList);

  useEffect(() => {
    console.log('employeesList', selectedEmployee);
  }, [selectedEmployee]);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, []);

  const { reset } = useForm({});
  useEffect(() => {
    reset();
  }, []);

  const addItem = async (userInput) => {
    await dispatch(addProject(userInput, setModalNotification));
    setModalAddItemOpen(false);
    await dispatch(getProjects());
  };

  const editItem = async (userInput) => {
    console.log(userInput);
    await dispatch(editProject(userInput, setModalNotification));
    setModalEditItemOpen(false);
    await dispatch(getProjects());
  };

  const deleteItem = async (userInput) => {
    await dispatch(deleteProject(userInput, setModalNotification));
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
      endDate: new Date(project.endDate).toISOString().substr(0, 10),
      edit: <Button icons="edit" callback={() => onEdit(project)} />,
      delete: <Button icons="delete" callback={() => onDelete(project)} />
    }));
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={modalAddItemOpen}
        setIsOpen={setModalAddItemOpen}
        reset={reset}
        title={'Create a Project'}
      >
        <div className={styles.modalHeader}></div>
        <ManageItemAdd handler={addItem} />
      </Modal>
      <Modal
        isOpen={modalEditItemOpen}
        setIsOpen={setModalEditItemOpen}
        reset={reset}
        title={'Change information'}
      >
        <ManageItem project={project} handler={editItem} />
      </Modal>
      <Modal isOpen={modalCloseOpen} setIsOpen={setModalCloseOpen} title={'Confirm'}>
        <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Confirmation</h5>
        </div>
        <div>Are you sure you want to delete the item?</div>
        <div className={styles.buttonConteiner}>
          <ButtonOption
            option={'yes'}
            text={'Confirm'}
            callback={() => deleteItem(project)}
          ></ButtonOption>
          <ButtonOption
            option={'no'}
            text={'Cancel'}
            callback={() => setModalCloseOpen(false)}
          ></ButtonOption>
        </div>
      </Modal>
      {/* MODAL NOTIFICATION */}
      <Modal
        isOpen={modalNotification}
        setIsOpen={setModalNotification}
        title={modalNotification.title}
      >
        <Button callback={() => setModalNotification(false)} text={'OK'} />
      </Modal>
      <div className={styles.buttonsOptions}>
        <div className={styles.textCenter}>
          <Button icons="add" text={'Project'} callback={() => setModalAddItemOpen(true)} />
        </div>
        <div className={styles.textCenter}>
          <Button icons="add" text={'Member'} callback={() => setModalAddMemberOpen(true)} />
        </div>
      </div>
      <Table
        data={getData(projects)}
        objProp={['name', 'description', 'client', 'startDate', 'endDate', 'edit', 'delete']}
        headers={['Name', 'Description', 'Client', 'Start Date', 'End Date', 'Edit', 'Delete']}
      />
      <Modal isOpen={modalAddMemberOpen} setIsOpen={setModalAddMemberOpen} title={'Add Member'}>
        <div className={styles.inputConteiner}>
          <select
            className={styles.itemsContainer}
            onChange={(e) => {
              setSelectedEmployee({ ...selectedEmployee, role: e.target.value });
            }}
          >
            {arrayRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            className={styles.itemsContainer}
            onChange={(e) => {
              setSelectedEmployee({ ...selectedEmployee, employeeId: e.target.value });
            }}
          >
            {employeesList.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select>
          <input
            className={styles.itemsContainer}
            type="number"
            placeholder="Rate"
            onChange={(e) => {
              setSelectedEmployee({ ...selectedEmployee, rate: e.target.value });
            }}
          />
        </div>
        <div className={styles.buttonConteiner}>
          <ButtonOption
            option={'yes'}
            text={'Confirm'}
            callback={() => {
              dispatch(
                membersThunks.addMember(
                  selectedEmployee.employeeId,
                  selectedEmployee.role,
                  selectedEmployee.rate
                )
              );
              setModalAddMemberOpen(false);
            }}
          ></ButtonOption>
          <ButtonOption
            option={'no'}
            text={'Cancel'}
            callback={() => setModalAddMemberOpen(false)}
          ></ButtonOption>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectsList;
