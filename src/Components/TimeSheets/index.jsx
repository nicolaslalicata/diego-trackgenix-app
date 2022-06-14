import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table/Table';
import Button from '../Shared/Buttons/buttons';
import Modal from '../Shared/Modal/index';
import ModalAddTimeSheet from './AddAndModal';
import ModalTimeSheetEdit from './EditAndModal';
import Loader from '../Shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSheets, deleteTimeSheet } from '../../redux/timesheets/thunks';

const TimeSheets = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [timeSheet, setTimesheet] = useState({});
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.timeSheets.timeSheetsList);
  const isLoading = useSelector((state) => state.timeSheets.isLoading);
  console.log(isLoading);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/`)
      .then((response) => response.json())
      .then((response) => setProjects(response.data));
    fetch(`${process.env.REACT_APP_API_URL}/employees/`)
      .then((response) => response.json())
      .then((response) => setEmployees(response.data));
    fetch(`${process.env.REACT_APP_API_URL}/tasks/`)
      .then((response) => response.json())
      .then((response) => setTasks(response.data));
  }, []);

  const onDelete = (timesheet) => {
    setIsModalDelete(true);
    setTimesheet(timesheet);
  };
  const onEdit = (timesheet) => {
    setIsModalEdit(true);
    setTimesheet(timesheet);
  };

  const getData = () => {
    return list.map((timesheet) => {
      return {
        ...timesheet,
        startDate: new Date(timesheet.startDate).toISOString().substr(0, 10),
        endDate: new Date(timesheet.endDate).toISOString().substr(0, 10),
        edit: (
          <Button
            icons="edit"
            callback={() => {
              onEdit(timesheet);
            }}
          />
        ),
        delete: <Button icons="delete" callback={() => onDelete(timesheet)} />
      };
    });
  };
  useEffect(async () => {
    try {
      await getTimeSheets()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    return (
      <section className={styles.listSection}>
        <h2>Timesheets</h2>
        <div>
          <Button
            btnStyle={{ width: '150px', height: '150px' }}
            text={'Create Timesheet'}
            callback={() => {
              setIsModalAdd(true);
            }}
          />
        </div>
        <ModalAddTimeSheet
          isModalAdd={isModalAdd}
          setIsModalAdd={setIsModalAdd}
          fetchTimeSheets={() => getTimeSheets()(dispatch)}
          employees={employees}
          tasks={tasks}
          projects={projects}
        ></ModalAddTimeSheet>
        <Table
          data={getData()}
          objProp={['description', 'startDate', 'endDate', 'hours', 'edit', 'delete']}
          headers={['Description', 'Start Date', 'End Date', 'Hours', 'Edit', 'Delete']}
        ></Table>
        <Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Confirmation</h5>
          </div>
          <div>Are you sure you want to delete the item?</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <Button
                callback={() => {
                  deleteTimeSheet(timeSheet)(dispatch).then(() => setIsModalDelete(false));
                }}
                text={'Delete'}
              />
              <Button
                callback={() => {
                  setIsModalDelete(false);
                }}
                text={'Cancel'}
              />
            </div>
          </div>
        </Modal>
        <ModalTimeSheetEdit
          isModalEdit={isModalEdit}
          setIsModalEdit={setIsModalEdit}
          fetchTimeSheets={getTimeSheets}
          timeSheet={timeSheet}
        ></ModalTimeSheetEdit>
      </section>
    );
  }
};

export default TimeSheets;
