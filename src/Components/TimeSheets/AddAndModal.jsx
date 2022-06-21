import React from 'react';
import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal/index';
import Input from '../Shared/Input';
import Button from '../Shared/Buttons/buttons';
import Dropdown from '../Shared/Dropdown/Dropdown';
import { addTimesheet } from '../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const ModalAddTimeSheet = ({ setIsModalAdd, isModalAdd, employees, tasks, projects }) => {
  // const [timesheet, setTimesheet] = useState({
  //   description: '',
  //   taskId: '',
  //   validated: '',
  //   employeeId: '',
  //   projectId: '',
  //   startDate: '',
  //   endDate: '',
  //   hours: ''
  // });
  const [hours, setHours] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskId, setTaskId] = useState('');
  const [validated, setValidated] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [isModalErrorAdd, setIsModalErrorAdd] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const error = useSelector((state) => state.timeSheets.error);
  const successMessage = useSelector((state) => state.timeSheets.successMessage);
  // const { onChange } = register('description', { required: true });
  const schema = Joi.object({
    description: Joi.string()
      .min(5)
      .max(30)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.min': 'Description must contain 5 or more characters',
        'string.max': 'Description must contain 30 or less characters',
        'string.pattern.base': 'Description is not valid',
        'string.empty': 'This field is required'
      })
      .required()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const dispatch = useDispatch();
  const reset = () => {
    setIsModalAdd(false),
      // setDescription(''),
      setHours(''),
      setStartDate(''),
      setEndDate(''),
      setTaskId(''),
      setValidated(''),
      setEmployeeId(''),
      setProjectId('');
  };
  useEffect(() => {
    if (error && successMessage === '') {
      return setIsModalErrorAdd(error);
    } else if (error === false && successMessage) {
      return setIsModalSuccess(true);
    }
  }, []);
  const submitTimesheet = (data) => {
    const newBody = {
      ...data
    };
    console.log(data);
    dispatch(addTimesheet(newBody));
  };
  // console.log('error', error, 'successMessage', successMessage);
  // console.log('isModalErrorAdd', isModalErrorAdd, 'isModalSuccess', isModalSuccess);
  // console.log(errors);
  // console.log(description);
  return (
    <>
      <Modal isOpen={isModalAdd} setIsOpen={setIsModalAdd}>
        <form
          onSubmit={handleSubmit(submitTimesheet)}

          // console.log(newBody);
          // (dispatch).then(() => setIsModalAdd(false));
        >
          <div className={styles.inputContainer}>
            <div className={styles.inputColumnOne}>
              <input
                // labelText={'Description'}
                // type="text"
                // placeholder="Description"
                // onChange={(e) => {
                //   setDescription(e.target.value);
                //   console.log(description);
                // }}
                // asd=
                {...register('description', { required: true })}
                // {...register('description', { required: true })}
              />
              {errors.description?.type ? <p>{errors.description.message}</p> : null}
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
                initialOption="Is Validated?"
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
              // callback={() => {
              //   addTimesheet(
              //     description,
              //     taskId,
              //     validated,
              //     employeeId,
              //     projectId,
              //     startDate,
              //     endDate,
              //     hours,
              //     reset
              //   )(dispatch).then(() => setIsModalAdd(false));
              // }}
            />
            <Button
              text={'Cancel'}
              callback={() => {
                setIsModalAdd(false);
                reset();
              }}
            ></Button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isModalErrorAdd} setIsOpen={setIsModalErrorAdd}>
        <div>Error: {error}</div>
      </Modal>
      <Modal isOpen={isModalSuccess} setIsOpen={setIsModalSuccess}>
        <div>{successMessage}</div>
      </Modal>
    </>
  );
};

export default ModalAddTimeSheet;
