import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table/Table';
import Button from '../Shared/Buttons/buttons';
import Modal from '../Shared/Modal/Modal';
import ModalAddTimeSheet from './AddAndModal';
import ModalTimeSheetEdit from './EditAndModal';
const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [timeSheet, setTimesheet] = useState({});
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const fetchTimeSheets = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/`)
      .then((response) => response.json())
      .then((response) => setList(response.data));
  };
  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${timeSheet._id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(fetchTimeSheets)
      .then(() => setIsModalDelete(false));
  };
  const onDelete = (timesheet) => {
    setIsModalDelete(true);
    setTimesheet(timesheet);
  };
  const onEdit = (timesheet) => {
    setIsModalEdit(true);
    setTimesheet(timesheet);
  };

  const getData = () => {
    return list.map((timesheet) => ({
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
    }));
  };
  useEffect(async () => {
    try {
      await fetchTimeSheets();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.listSection}>
      <h2>Timesheets</h2>
      <div>
        <Button
          text={'Create Timesheet'}
          callback={() => {
            setIsModalAdd(true);
          }}
        />
      </div>
      <ModalAddTimeSheet
        isModalAdd={isModalAdd}
        setIsModalAdd={setIsModalAdd}
        fetchTimeSheets={fetchTimeSheets}
      ></ModalAddTimeSheet>
      <Table
        data={getData()}
        headers={['description', 'startDate', 'endDate', 'hours', 'edit', 'delete']}
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
                handleDelete();
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
        fetchTimeSheets={fetchTimeSheets}
        timeSheet={timeSheet}
      ></ModalTimeSheetEdit>
    </section>
  );
};

export default TimeSheets;
