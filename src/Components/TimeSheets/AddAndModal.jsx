import React from 'react';
import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Shared/Modal/index';
import Button from '../Shared/Buttons/buttons';
import DropdownForm from '../Shared/dropdownForm.jsx/dropdownForm';
import { addTimesheet } from '../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import InputControlled from '../Shared/inputControlled/inputControlled';
const ModalAddTimeSheet = ({ setIsModalAdd, isModalAdd, employees, tasks, projects }) => {
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const error = useSelector((state) => state.timeSheets.error);
  const successMessage = useSelector((state) => state.timeSheets.successMessage);
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
      .required(),
    startDate: Joi.date().default(() => {
      return new Date();
    }),
    endDate: Joi.date().default(() => {
      return new Date();
    }),
    hours: Joi.number().required().positive(),
    projects: Joi.string().required().min(10),
    tasks: Joi.string().required().min(10),
    employees: Joi.string().required().min(10),
    validated: Joi.string().required().min(3)
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });
  useEffect(() => {
    reset();
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error === false && successMessage) {
      return setIsModalSuccess(true);
    }
  }, []);
  const addTimeSheetHandler = (
    { description, hours, startDate, endDate, tasks, projects, employees, validated },
    e
  ) => {
    e.preventDefault();
    dispatch(
      addTimesheet(
        description,
        tasks,
        validated,
        projects,
        employees,
        startDate,
        endDate,
        hours,
        reset
      )
    );
    setIsModalAdd(false);
    reset();
  };
  // console.log('error', error, 'successMessage', successMessage);
  // console.log('isModalErrorAdd', isModalErrorAdd, 'isModalSuccess', isModalSuccess);
  // console.log(errors);
  // console.log(description);
  return (
    <>
      <Modal isOpen={isModalAdd} setIsOpen={setIsModalAdd}>
        <form onSubmit={handleSubmit(addTimeSheetHandler)} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputColumnOne}>
              <InputControlled
                type={'text'}
                label={'Description'}
                name="description"
                register={register}
                required
                error={errors.description}
              />
              <InputControlled
                type={'text'}
                label={'Hours'}
                name="hours"
                register={register}
                required
                error={errors.hours}
              />
              <InputControlled
                type={'date'}
                label={'Start Date'}
                name="startDate"
                register={register}
                required
                error={errors.startDate}
              />
              <InputControlled
                type={'date'}
                label={'End Date'}
                name="endDate"
                register={register}
                required
                error={errors.endDate}
              />
            </div>
            <div className={styles.inputColumnTwo}>
              <DropdownForm
                initialOption="Select a project"
                label="Projects"
                options={projects}
                name="projects"
                register={register}
                required
                error={errors.projects}
              />
              <DropdownForm
                initialOption="Select a employee"
                label="Employees"
                options={employees}
                name="employees"
                register={register}
                required
                error={errors.employees}
              />
              <DropdownForm
                initialOption="Select a task"
                label="Tasks"
                options={tasks}
                name="tasks"
                register={register}
                required
                error={errors.tasks}
              />
              <DropdownForm
                initialOption="Is Validated?"
                label="Validated"
                options={['true', 'false']}
                name="validated"
                register={register}
                required
                error={errors.validated}
              />
            </div>
          </div>
          <div className={styles.btnModalContainer}>
            <Button
              text={'Cancel'}
              callback={() => {
                setIsModalAdd(false);
                reset();
              }}
            ></Button>
            <Button text={'Add'} />
          </div>
        </form>
      </Modal>
      <Modal isOpen={isModalSuccess} setIsOpen={setIsModalSuccess}>
        <div>{successMessage}</div>
      </Modal>
    </>
  );
};

export default ModalAddTimeSheet;
