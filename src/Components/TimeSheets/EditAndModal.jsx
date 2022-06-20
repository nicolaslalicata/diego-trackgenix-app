import React from 'react';
import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Button from '../Shared/Buttons/buttons';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal/index';
import { editTimeSheet } from '../../redux/timesheets/thunks';
import { useDispatch } from 'react-redux/es/exports';

const ModalTimeSheetEdit = ({ isModalEdit, timeSheet, setIsModalEdit }) => {
  const [description, setDescription] = useState(timeSheet.description);
  const [hours, setHours] = useState(timeSheet.hours);
  const [startDate, setStartDate] = useState('2022-06-08T00:00:00.000Z');
  const [endDate, setEndDate] = useState('2022-06-08T00:00:00.000Z');
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(timeSheet.description);
    setHours(timeSheet.hours);
    setStartDate(timeSheet.startDate);
    setEndDate(timeSheet.endDate);
  }, [timeSheet]);

  const handleEdit = () => {
    dispatch(editTimeSheet(timeSheet, description, startDate, endDate, hours, setIsModalSuccess));
    setIsModalSuccess(true);
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
            value={startDate.substring(0, 10)}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            labelText={'Start date'}
          />
          <Input
            type="date"
            value={endDate.substring(0, 10)}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            labelText={'End Date'}
          />
          <div className={styles.btnModalContainer}>
            <Button
              callback={() => {
                setIsModalEdit(false);
                setIsModalConfirm(true);
              }}
              text={'Edit'}
            ></Button>
            <button onClick={handleEdit}>asdasdasd</button>
            <Button
              callback={() => {
                setIsModalEdit(false);
              }}
              text={'Cancel'}
            ></Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isModalSuccess} setIsOpen={setIsModalSuccess}>
        <div>Timesheet edited successfully</div>
      </Modal>
      <Modal isOpen={isModalConfirm} setIsOpen={setIsModalConfirm}>
        <div>
          <h5>Are you sure you want to edit the item?</h5>
        </div>
        <div className={styles.btnModalContainer}>
          <Button
            callback={(e) => {
              e.preventDefault();
              handleEdit();
              dispatch(
                editTimeSheet(timeSheet, description, startDate, endDate, hours, setIsModalSuccess)
              ),
                setIsModalSuccess(true);
              setIsModalConfirm(false);
            }}
            text={'Confirm'}
          />

          <Button callback={() => setIsModalConfirm(false)} text={'Cancel'} />
        </div>
      </Modal>
    </section>
  );
};

export default ModalTimeSheetEdit;
