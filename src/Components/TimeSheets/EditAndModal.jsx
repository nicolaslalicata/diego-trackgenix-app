import React from 'react';
import { useState } from 'react';
import styles from './time-sheets.module.css';
// import ModalAdd from './ModalConfirmation';
import Modal from '../Shared/Modal/Modal';
const ModalTimeSheetEdit = ({ isModalEdit, timeSheet, fetchTimeSheets, setIsModalEdit }) => {
  const [description, setDescription] = useState(timeSheet.description);
  const [hours, setHours] = useState(timeSheet.hours);
  const [startDate, setStartDate] = useState(timeSheet.startDate);
  const [endDate, setEndDate] = useState(timeSheet.endDate);

  const handleEdit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/${timeSheet._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        taskId: timeSheet.taskId,
        validated: timeSheet.validated,
        employeeId: timeSheet.employeeId,
        projectId: timeSheet.projectId,
        startDate: startDate,
        endDate: endDate,
        hours: hours
      })
    })
      .then((response) => {
        response.json(),
          response.status === 201
            ? alert('Edited successfully')
            : alert('There was an error during edition');
      })
      .then(fetchTimeSheets)
      .then(() => setIsModalEdit(false));
  };

  return (
    <Modal isOpen={isModalEdit} setIsOpen={setIsModalEdit}>
      <div className={styles.modalEditContainer}>
        <span>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </span>
        <span>
          Hours
          <input
            type="text"
            value={hours}
            onChange={(e) => {
              setHours(e.target.value);
            }}
          />
        </span>
        <span>
          Start date
          <input
            type="date"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </span>
        <span>
          End Date
          <input
            type="date"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </span>
        <button
          onClick={() => {
            handleEdit(), setIsModalEdit(false);
          }}
        >
          Confirm
        </button>
        <button
          onClick={() => {
            setIsModalEdit(false);
            console.log(description, timeSheet);
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalTimeSheetEdit;
