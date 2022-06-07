import React from 'react';
import { useState } from 'react';
import styles from './time-sheets.module.css';
import ModalAdd from './ModalConfirmation';
const ModalTimeSheetEdit = ({ showModalEdit, timeSheet, fetchTimeSheets, setShowModalEdit }) => {
  const [description, setDescription] = useState(timeSheet.description);
  const [hours, setHours] = useState(timeSheet.hours);
  const [startDate, setStartDate] = useState(timeSheet.startDate);
  const [endDate, setEndDate] = useState(timeSheet.endDate);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

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
      .then(() => setShowModalEdit(false));
  };

  return showModalEdit ? (
    <div className={styles.modalEditContainer}>
      <span>
        Description{' '}
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </span>
      <span>
        Hours{' '}
        <input
          type="text"
          value={hours}
          onChange={(e) => {
            setHours(e.target.value);
          }}
        />
      </span>
      <span>
        Start date{' '}
        <input
          type="date"
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
      </span>
      <span>
        End Date{' '}
        <input
          type="date"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
      </span>
      <button onClick={() => setAddModalIsOpen(true)}>Confirm</button>
      <button onClick={() => setShowModalEdit(false)}>Cancel</button>
      <ModalAdd
        setShowModalEdit={setShowModalEdit}
        addModalIsOpen={addModalIsOpen}
        setAddModalIsOpen={setAddModalIsOpen}
        handleEdit={handleEdit}
      ></ModalAdd>
    </div>
  ) : null;
};

export default ModalTimeSheetEdit;
