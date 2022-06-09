import React from 'react';
import styles from './time-sheets.module.css';
import { useState } from 'react';
import Modal from '../Shared/Modal/Modal';
import Input from '../Shared/Input';
import Button from '../Shared/Buttons/buttons';
const ModalAddTimeSheet = ({ setIsModalAdd, fetchTimeSheets, isModalAdd }) => {
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
        setIsModalAdd(false),
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
  return (
    <Modal isOpen={isModalAdd} setIsOpen={setIsModalAdd}>
      <div className={styles.inputContainer}>
        <div className={styles.inputColumnOne}>
          <Input
            labelText={'Description'}
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <Input
            labelText={'Hours'}
            type="text"
            placeholder="Hours"
            onChange={(e) => {
              setHours(e.target.value);
            }}
          />
          <Input
            labelText={'Start Date'}
            type={'date'}
            placeholder={'updatedAt'}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
          <Input
            labelText={'End Date'}
            type="date"
            placeholder="endDate"
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
          <Input
            labelText={'Task ID'}
            type="text"
            placeholder="taskId"
            onChange={(e) => {
              setTaskId(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputColumnTwo}>
          <Input
            labelText={'Employee ID'}
            type="text"
            placeholder="employeeId"
            onChange={(e) => {
              setEmployeeId(e.target.value);
            }}
          />
          <Input
            labelText={'Project ID'}
            type="text"
            placeholder="projectId"
            onChange={(e) => {
              setProjectId(e.target.value);
            }}
          />
          <Input
            labelText={'Validated'}
            type="text"
            placeholder="Validated"
            onChange={(e) => {
              setValidated(e.target.value);
            }}
          />
          <Button text={'Add'} callback={handlePost}>
            Add
          </Button>
          <Button
            text={'Cancel'}
            callback={() => {
              setIsModalAdd(false);
            }}
          ></Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddTimeSheet;
