import React from 'react';
import styles from './time-sheets.module.css';
import { useState } from 'react';
const ModalTimeSheet = ({ showModal, fetchTimeSheets, setShowModal }) => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskId, setTaskId] = useState('');
  const [validated, setValidated] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const handlePost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/timesheets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description,
        taskId: taskId,
        validated: validated,
        employeeId: employeeId,
        projectId: projectId,
        startDate: startDate,
        endDate: endDate,
        hours: hours
      })
    })
      .then((response) => {
        response.json(),
          response.status === 201
            ? alert('Added successfully')
            : alert('There was an error during creation');
      })
      .then(fetchTimeSheets)
      .then(() => {
        setShowModal(false),
          setDescription(''),
          setHours(''),
          setStartDate(''),
          setEndDate(''),
          setTaskId(''),
          setValidated(''),
          setEmployeeId(''),
          setProjectId('');
      });
  };
  return showModal ? (
    <div className={styles.modalContainer}>
      <div className={styles.modalPost}>
        <span>
          Description{' '}
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </span>
        <span>
          Hours{' '}
          <input
            type="text"
            placeholder="Hours"
            onChange={(e) => {
              setHours(e.target.value);
            }}
          />
        </span>
        <span>
          Start date{' '}
          <input
            type="date"
            placeholder="updatedAt"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </span>
        <span>
          End Date{' '}
          <input
            type="date"
            placeholder="endDate"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </span>
        <span>
          Task id{' '}
          <input
            type="text"
            placeholder="taskId"
            onChange={(e) => {
              setTaskId(e.target.value);
            }}
          />
        </span>
        <span>
          Employee id{' '}
          <input
            type="text"
            placeholder="employeeId"
            onChange={(e) => {
              setEmployeeId(e.target.value);
            }}
          />
        </span>
        <span>
          Project id{' '}
          <input
            type="text"
            placeholder="projectId"
            onChange={(e) => {
              setProjectId(e.target.value);
            }}
          />
        </span>
        <span>
          Validated{' '}
          <input
            type="text"
            placeholder="Validated"
            onChange={(e) => {
              setValidated(e.target.value);
            }}
          />
        </span>
        <button onClick={handlePost}>Add</button>
        <button
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : null;
};

export default ModalTimeSheet;
