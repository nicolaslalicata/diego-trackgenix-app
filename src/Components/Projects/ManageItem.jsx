import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './manageItem.module.css';

import InputControlled from '../Shared/InputControlled';
import Button from '../Shared/Buttons/buttons';
import { useEffect } from 'react';

const ManageItem = function ({ handler, project }) {
  const defaultValue = {
    client: '',
    description: '',
    endDate: '',
    name: '',
    startDate: ''
  };

  useEffect(() => {
    if (project) {
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('client', project.client);
      setValue('startDate', project.startDate);
      setValue('endDate', project.endDate);
    }
  }, []);

  const schema = yup.object({
    name: yup.string().min(3).required(),
    description: yup
      .string()
      .min(5)
      .matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Is not in correct format')
      .required(),
    client: yup.string().min(3).required(),
    startDate: yup.date().required(),
    endDate: yup
      .date()
      .min(yup.ref('startDate'), 'The End Date must be greater than the Start Date')
      .required()
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
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
