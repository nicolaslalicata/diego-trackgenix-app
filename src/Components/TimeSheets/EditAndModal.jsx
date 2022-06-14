import React from 'react';
import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Button from '../Shared/Buttons/buttons';
import Input from '../Shared/Input';
import Modal from '../Shared/Modal/index';
import { editTimeSheet } from '../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
const ModalTimeSheetEdit = ({ isModalEdit, timeSheet, setIsModalEdit }) => {
  const [description, setDescription] = useState(timeSheet.description);
  const [hours, setHours] = useState(timeSheet.hours);
  const [startDate, setStartDate] = useState('2018-01-01');
  const [endDate, setEndDate] = useState(timeSheet.endDate);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalErrorEdit, setIsModalErrorEdit] = useState(false);
  const error = useSelector((state) => state.timeSheets.error);
  const dispatch = useDispatch();
  useEffect(() => {
    setDescription(timeSheet.description);
    setHours(timeSheet.hours);
    setStartDate(timeSheet.startDate);
    setEndDate(timeSheet.endDate);
  }, [timeSheet]);
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
              setIsModalEdit(false);
              setIsModalConfirm(true);
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
            editTimeSheet(
              timeSheet,
              description,
              startDate,
              endDate,
              hours,
              setIsModalErrorEdit
            )(dispatch).then(() => setIsModalEdit(false));
            setIsModalConfirm(false);
          }}
          text={'Confirm'}
        />
        <Button callback={() => setIsModalConfirm(false)} text={'Cancel'} />
      </Modal>
      <Modal isOpen={isModalErrorEdit} setIsOpen={setIsModalErrorEdit}>
        <div>Error: {error}</div>
      </Modal>
    </section>
  );
};

export default ModalTimeSheetEdit;
