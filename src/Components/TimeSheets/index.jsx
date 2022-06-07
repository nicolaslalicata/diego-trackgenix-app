import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import ModalTimeSheet from './AddAndModal';
import Table from '../Shared/Table/Table';
const TimeSheets = () => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const fetchTimeSheets = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/`)
      .then((response) => response.json())
      .then((response) => setList(response.data));
  };
  const handleDelete = (timeSheet) => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${timeSheet._id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(fetchTimeSheets);
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
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Create Timesheet
      </button>
      <ModalTimeSheet
        showModal={showModal}
        setShowModal={setShowModal}
        fetchTimeSheets={fetchTimeSheets}
      ></ModalTimeSheet>
      <Table
        data={list}
        headers={['description', 'startDate', 'endDate', 'hours']}
        actions={<button>sads</button>}
      ></Table>
    </section>
  );
};

export default TimeSheets;
