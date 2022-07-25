import React from 'react';
import styles from './time-sheets.module.css';
import { useState, useEffect } from 'react';
import * as timesheetThunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Modal from 'components/shared/modal';
import DropdownForm from 'components/shared/dropdownForm';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';

const ModalAddTimeSheet = ({ setIsModalAdd, isModalAdd, employees, tasks, projects }) => {
  const [isModalSuccess, setIsModalSuccess] = useState(false, { message: '' });
  const error = useSelector((state) => state.timeSheets.error);
  const successMessage = useSelector((state) => state.timeSheets.successMessage);

  const schema = Joi.object({
    description: Joi.string().min(5).max(40).trim().messages({
      'string.min': 'Description must contain 5 or more characters',
      'string.max': 'Description must contain 40 or less characters',
      'string.pattern.base': 'Description is not valid',
      'string.empty': 'This field is required'
    }),
    startDate: Joi.date()
      .messages({
        'date.base': 'Date is not valid',
        'date.empty': 'This field is required'
      })
      .required(),
    endDate: Joi.date()
      .min(Joi.ref('startDate'))
      .messages({
        'date.base': 'Date is not valid',
        'date.greater': 'End date must be after the start date',
        'any.ref': 'Start date is required'
      })
      .optional(),
    hours: Joi.number().required().positive(),
    projects: Joi.string().required().min(10),
    tasks: Joi.string().required().min(10),
    employees: Joi.string().required().min(10),
    validated: Joi.boolean().required()
  });

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsModalSuccess(false);
        setIsModalAdd(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

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
      timesheetThunks.addTimesheet(
        description,
        tasks,
        validated,
        employees,
        projects,
        startDate,
        endDate,
        hours
      )
    );
    setIsModalAdd(false);
    setIsModalSuccess(true);
  };

  return (
    <>
      <Modal
        isOpen={isModalAdd}
        setIsOpen={setIsModalAdd}
        title={'Add new Timesheet'}
        reset={reset}
      >
        <form onSubmit={handleSubmit(addTimeSheetHandler)} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputColumnTwo}>
              <DropdownForm
                initialOption="Select a employee"
                label="Employee"
                options={employees}
                name="employees"
                register={register}
                required
                error={errors.employees}
              />

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
                options={[
                  { id: 1, name: 'true' },
                  { id: 0, name: 'false' }
                ]}
                name="validated"
                register={register}
                required
                error={errors.validated}
              />
            </div>

            <div className={styles.inputColumnOne}>
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

              <InputControlled
                type={'text'}
                label={'Comments'}
                name="description"
                register={register}
                required
                error={errors.description}
              />
            </div>
          </div>
          <div className={styles.btnModalContainer}>
            <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
            <ButtonOption
              option={'no'}
              callback={() => {
                setIsModalAdd(false);
                reset();
              }}
              text={'Cancel'}
            ></ButtonOption>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isModalSuccess} setIsOpen={setIsModalSuccess} title={'Success'} reset={reset}>
        <h1>{successMessage}</h1>
      </Modal>
    </>
  );
};

export default ModalAddTimeSheet;
