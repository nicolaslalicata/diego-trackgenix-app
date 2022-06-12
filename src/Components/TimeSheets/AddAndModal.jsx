import React from 'react';
import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal/index';
import Input from '../Shared/Input';
import Button from '../Shared/Buttons/buttons';
import Dropdown from '../Shared/Dropdown/Dropdown';

const ModalAddTimeSheet = ({
  setIsModalAdd,
  fetchTimeSheets,
  isModalAdd,
  employees,
  tasks,
  projects
}) => {
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskId, setTaskId] = useState('');
  const [validated, setValidated] = useState('false');
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');

  // const getEmployee = (emp, id) => {
  //   const result = emp.filter((e) => {
  //     e._id === id;
  //   });
  //   return setEmp(result);
  // };
  // const result = employees.filter((e) => {
  //   e._id == '629fa2d5338aeb26e9b29f50';
  // });

  // useEffect(() => {
  //   getEmployee(employees, employeeId);
  // }, [employeeId]);

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
    </Modal>
  );
};

export default ModalAddTimeSheet;
