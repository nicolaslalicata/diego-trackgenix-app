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
    description: Joi.string().min(5).max(30).trim().messages({
      'string.min': 'Description must contain 5 or more characters',
      'string.max': 'Description must contain 30 or less characters',
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
    project: Joi.string().required(),
    task: Joi.string().required(),
    employee: Joi.string().required(),
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
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsModalEdit(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    reset({
      description: timeSheet.description,
      startDate: new Date(timeSheet.startDate).toISOString().substr(0, 10),
      endDate: new Date(timeSheet.endDate).toISOString().substr(0, 10),
      hours: timeSheet.hours,
      project: timeSheet.project ? timeSheet.project._id : '',
      task: timeSheet.task ? timeSheet.task._id : '',
      employee: timeSheet.employee ? timeSheet.employee._id : '',
      validated: timeSheet.validated
    });
  }, [timeSheet]);

  const editTimeSheetHandler = (
    { description, hours, startDate, endDate, task, validated, employee, project },
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
        task,
        validated,
        employee,
        project
      )
    );
    setIsModalEdit(false);
  };

  return (
    <section>
      <Modal isOpen={isModalEdit} setIsOpen={setIsModalEdit} reset={reset} title={`Edit timesheet`}>
        <form onSubmit={handleSubmit(editTimeSheetHandler)} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputColumnTwo}>
              <DropdownForm
                initialOption="Select an employee"
                label="Employee"
                options={employees}
                name="employee"
                register={register}
                required
                error={errors.employee}
              />

              <DropdownForm
                initialOption="Select a project"
                label="Projects"
                options={projects}
                name="project"
                register={register}
                required
                error={errors.project}
              />

              <DropdownForm
                initialOption="Select a task"
                label="Tasks"
                options={tasks}
                name="task"
                register={register}
                required
                error={errors.task}
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
