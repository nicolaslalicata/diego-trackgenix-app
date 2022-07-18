import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import styles from './manageItem.module.css';
import Dropdown from 'components/shared/dropdown';
import InputControlled from 'components/shared/inputControlled';
import Button from 'components/shared/buttons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import * as membersThunks from 'redux/members/thunks';
import Select from 'react-select';
const ManageItem = function ({ handler, project }) {
  // -------------------------------------------------------------------------------
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      await membersThunks.getMembers()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const membersList = useSelector((state) => state.members.membersList);
  console.log('members', membersList);
  console.log('project-member', project.members[0].memberId);
  console.log('array members of this project', project.members);
  //---------------------------------------------------------------------------------
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
      .messages({
        'date.base': 'Date is not valid',
        'date.empty': 'This field is required'
      })
      .required(),
    endDate: joi
      .date()
      .min(joi.ref('startDate'))
      .messages({
        'date.base': 'Date is not valid',
        'any.ref': 'Start date is required'
      })
      .optional()
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
  const options = [
    membersList.map((e) => {
      return { value: `${e._id}`, label: `${e.role}` };
    })
    // { value: 'produto 01', label: 'Produto 01' },
    // { value: 'produto 02', label: 'Produto 02' },
    // { value: 'produto 03', label: 'Produto 03' },
    // { value: 'produto 04', label: 'Produto 04' },
    // { value: 'produto 05', label: 'Produto 05' },
    // { value: 'produto 06', label: 'Produto 06' },
    // { value: 'produto 07', label: 'Produto 07' },
    // { value: 'produto 08', label: 'Produto 08' }
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = () => {
    console.log(selectedOptions);
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
          <Select
            defaultValue={[options[0], options[2]]}
            isMulti
            options={membersList.map((e) => {
              return { value: `${e._id}`, label: `${e.role}` };
            })}
            onChange={(item) => setSelectedOptions(item)}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
          />

          <button onClick={handleSelect}>Imprimir itens</button>
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
      {project.members.map((e, index) => {
        return <p key={index}>{e.memberId}</p>;
      })}
      <div className={styles.buttonConteiner}>
        <Button icons="submit" />
      </div>
    </form>
  );
};

export default ManageItem;
