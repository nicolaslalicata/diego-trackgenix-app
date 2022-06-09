import React from 'react';
import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Button from '../Shared/Buttons/buttons';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal/Modal';
const ModalTimeSheetEdit = ({ isModalEdit, timeSheet, fetchTimeSheets, setIsModalEdit }) => {
  const [description, setDescription] = useState(timeSheet.description);
  const [hours, setHours] = useState(timeSheet.hours);
  const [startDate, setStartDate] = useState(timeSheet.startDate);
  const [endDate, setEndDate] = useState(timeSheet.endDate);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  useEffect(() => {
    setDescription(timeSheet.description);
    setHours(timeSheet.hours);
    setStartDate(timeSheet.startDate);
    setEndDate(timeSheet.endDate);
  }, [timeSheet]);

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
    <section>
      <Modal isOpen={isModalEdit} setIsOpen={setIsModalEdit}>
        <div className={styles.modalEditContainer}>
          <Input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            labelText={'Description'}
          />
          <Input
            type="text"
            value={hours}
            onChange={(e) => {
              setHours(e.target.value);
            }}
            labelText={'Hours'}
          />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            labelText={'Start date'}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            labelText={'End Date'}
          />
          <Button
            callback={() => {
              setIsModalEdit(false), setIsModalConfirm(true);
            }}
            text={'Edit'}
          ></Button>
          <Button
            callback={() => {
              setIsModalEdit(false);
            }}
            text={'Cancel'}
          ></Button>
        </div>
      </Modal>
      <Modal isOpen={isModalConfirm} setIsOpen={setIsModalConfirm}>
        <div>
          <h5>Are you sure you want to edit the item?</h5>
        </div>
        <Button
          className={styles.deleteBtn}
          callback={() => {
            handleEdit(), setIsModalConfirm(false);
          }}
          text={'Confirm'}
        />
        <Button callback={() => setIsModalConfirm(false)} text={'Cancel'} />
      </Modal>
    </section>
  );
};

export default ModalTimeSheetEdit;
