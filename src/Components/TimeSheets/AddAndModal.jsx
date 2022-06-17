import React from 'react';
import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal/index';
import Input from '../Shared/Input';
import Button from '../Shared/Buttons/buttons';
import Dropdown from '../Shared/Dropdown/Dropdown';
import { addTimesheet } from '../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
const ModalAddTimeSheet = ({ setIsModalAdd, isModalAdd, employees, tasks, projects }) => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskId, setTaskId] = useState('');
  const [validated, setValidated] = useState('false');
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [isModalErrorAdd, setIsModalErrorAdd] = useState(false);
  const error = useSelector((state) => state.timeSheets.error);
  const dispatch = useDispatch();
  const reset = () => {
    setIsModalAdd(false),
      setDescription(''),
      setHours(''),
      setStartDate(''),
      setEndDate(''),
      setTaskId(''),
      setValidated(''),
      setEmployeeId(''),
      setProjectId('');
  };
  useEffect(() => {
    setIsModalErrorAdd(error);
  }, [error]);

  return (
    <>
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
          </div>
          <div className={styles.inputColumnTwo}>
            <Dropdown
              initialOption="Select a project"
              label="Projects"
              options={projects}
              value={projectId}
              onChange={(e) => {
                setProjectId(e.target.value);
              }}
            />
            <Dropdown
              initialOption="Select a employee"
              label="Employees"
              options={employees}
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
              }}
            />
            <Dropdown
              initialOption="Select a task"
              label="Tasks"
              options={tasks}
              value={taskId}
              onChange={(e) => {
                setTaskId(e.target.value);
              }}
            />
            <Dropdown
              label="Validated"
              options={['true', 'false']}
              value={validated}
              onChange={(e) => {
                setValidated(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.btnModalContainer}>
          <Button
            text={'Add'}
            callback={() => {
              addTimesheet(
                description,
                taskId,
                validated,
                employeeId,
                projectId,
                startDate,
                endDate,
                hours,
                reset
              )(dispatch).then(() => setIsModalAdd(false));
            }}
          />
          <Button
            text={'Cancel'}
            callback={() => {
              setIsModalAdd(false);
            }}
          ></Button>
        </div>
      </Modal>
      <Modal isOpen={isModalErrorAdd} setIsOpen={setIsModalErrorAdd}>
        <div>Error: {error}</div>
      </Modal>
    </>
  );
};

export default ModalAddTimeSheet;
