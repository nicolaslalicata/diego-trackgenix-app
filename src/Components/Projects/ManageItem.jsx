import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import styles from './manageItem.module.css';

import InputControlled from '../Shared/InputControlled';
import Button from '../Shared/Buttons/buttons';
import { useEffect } from 'react';

const ManageItem = function ({ handler, project }) {
  useEffect(() => {
    if (project) {
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('client', project.client);
      setValue('startDate', project.startDate);
      setValue('endDate', project.endDate);
    }
  }, []);

  const schema = joi.object({
    name: joi
      .string()
      .min(3)
      .trim()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Is not in correct format')
      .required(),
    description: joi
      .string()
      .min(5)
      .trim()
      .regex(/^([a-zA-Z0-9!@#$%&*])+$/, 'Is not in correct format')
      .required(),
    client: joi
      .string()
      .min(3)
      .trim()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Is not in correct format')
      .required(),
    startDate: joi
      .date()
      .greater('1-1-1974')
      .message('The Start Date must be greater than the 2000/01/01')
      .required(),
    endDate: joi
      .date()
      .min(joi.ref('startDate'), 'The End Date must be greater than the Start Date')
      .required()
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  const onSubmit = (data) => {
    if (project) {
      handler({ ...data, isActive: true, members: [], _id: project._id });
    } else {
      handler({ ...data, isActive: true, members: [] });
    }
  };

  return (
    <form id="projectForm" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputConteiner}>
        <div>
          <InputControlled
            type="text"
            className={styles.input}
            label="Name"
            register={register}
            name="name"
            required
            error={errors.name}
          />
          <InputControlled
            type="text"
            className={styles.input}
            label="Description"
            register={register}
            name="description"
            required
            error={errors.description}
          />
          <InputControlled
            type="text"
            className={styles.input}
            label="Client"
            register={register}
            name="client"
            required
            error={errors.client}
          />
        </div>
        <div>
          <InputControlled
            className={styles.input}
            type="date"
            label="Start Date"
            register={register}
            name="startDate"
            required
            error={errors.startDate}
          />
          <InputControlled
            className={styles.input}
            type="date"
            label="End Date"
            register={register}
            name="endDate"
            required
            error={errors.endDate}
          />
        </div>
      </div>
      <div className={styles.buttonConteiner}>
        <Button icons="submit" />
      </div>
    </form>
  );
};

export default ManageItem;
