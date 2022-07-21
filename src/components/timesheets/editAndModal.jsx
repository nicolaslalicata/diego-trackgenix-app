import React from 'react';
import { useEffect } from 'react';
import styles from './time-sheets.module.css';
import Modal from 'components/shared/modal';
import { ButtonOption } from 'components/shared/buttonsOption';
import DropdownForm from 'components/shared/dropdownForm';
import InputControlled from 'components/shared/inputControlled';
import * as timesheetThunks from 'redux/timesheets/thunks';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const ModalTimeSheetEdit = ({
  isModalEdit,
  timeSheet,
  setIsModalEdit,
  employees,
  tasks,
  projects
}) => {
  const dispatch = useDispatch();

  const schema = Joi.object({
    description: Joi.string()
      .min(5)
      .max(30)
      .trim()
      .regex(/^([ \u00c0-\u01ffa-zA-Z0-9'-])+$/)
      .messages({
        'string.min': 'Description must contain 5 or more characters',
        'string.max': 'Description must contain 30 or less characters',
        'string.pattern.base': 'Description is not valid',
        'string.empty': 'This field is required'
      })
      .required(),
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
    projects: Joi.string().required(),
    tasks: Joi.string().required(),
    employees: Joi.string().required(),
    validated: Joi.boolean().required()
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    reset({
      description: timeSheet.description,
      startDate: new Date(timeSheet.startDate).toISOString().substr(0, 10),
      endDate: new Date(timeSheet.endDate).toISOString().substr(0, 10),
      hours: timeSheet.hours,
      projects: timeSheet.projectId ? timeSheet.projectId._id : '',
      tasks: timeSheet.taskId ? timeSheet.taskId._id : '',
      employees: timeSheet.employeeId ? timeSheet.employeeId._id : '',
      validated: timeSheet.validated
    });
  }, [timeSheet]);

  const editTimeSheetHandler = (
    { description, hours, startDate, endDate, tasks, validated, employees, projects },
    e
  ) => {
    e.preventDefault();
    dispatch(
      timesheetThunks.editTimeSheet(
        timeSheet,
        description,
        startDate,
        endDate,
        hours,
        tasks,
        validated,
        employees,
        projects
      )
    );
    setIsModalEdit(false);
  };

  return (
    <section>
      <Modal
        isOpen={isModalEdit}
        setIsOpen={setIsModalEdit}
        reset={reset}
        title={`Edit ${timeSheet.employeeId.firstName} ${timeSheet.employeeId.lastName}'s timesheet`}
      >
        <form onSubmit={handleSubmit(editTimeSheetHandler)} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputColumnTwo}>
              <DropdownForm
                initialOption="Select an employee"
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
                setIsModalEdit(false);
                reset();
              }}
              text={'Cancel'}
            ></ButtonOption>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default ModalTimeSheetEdit;
