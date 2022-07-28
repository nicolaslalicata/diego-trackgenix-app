import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import styles from './manageItem.module.css';
// import Dropdown from 'components/shared/dropdown';
import { getProjects } from 'redux/projects/thunks';
import InputControlled from 'components/shared/inputControlled';
import Button from 'components/shared/buttons';
import DropdownForm from 'components/shared/dropdown';
import Table from 'components/shared/table';
import Modal from 'components/shared/modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import * as membersThunks from 'redux/members/thunks';
const arrayRoles = ['QA', 'Dev', 'PM'];
const ManageItem = function ({ handler, project }) {
  // -------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [modalMember, setModalMember] = useState(false);
  useEffect(async () => {
    try {
      await membersThunks.getMembers()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    const mappedOpt = project.members.map(({ memberId }) => {
      return {
        role: (
          <select
            onChange={(e) => {
              dispatch(
                membersThunks.editMember(
                  memberId._id,
                  memberId.employeeId._id,
                  e.target.value,
                  memberId.rate
                )
              );
            }}
            defaultValue={memberId.role}
          >
            {arrayRoles.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        ),
        rate: memberId.rate,
        name: memberId.employeeId.firstName,
        lastName: memberId.employeeId.lastName,
        delete: <Button icons="close" />
      };
    });
    setSelectedOptions(mappedOpt);
  }, [project.members]);

  const membersList = useSelector((state) => state.members.membersList);
  // console.log('project-member', project.members[0].memberId);
  // console.log('array members of this project', project.members);
  //---------------------------------------------------------------------------------
  useEffect(() => {
    if (project) {
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('client', project.client);
      setValue('startDate', project.startDate);
      setValue('endDate', project.endDate);
      setValue('tasks', project.tasks);
    }
  }, []);
  const schema = joi.object({
    name: joi
      .string()
      .min(3)
      .trim()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, 'Is not in correct format')
      .required(),
    description: joi.string().min(5).max(40).trim().messages({
      'string.min': 'Description must contain 5 or more characters',
      'string.max': 'Description must contain 40 or less characters',
      'string.pattern.base': 'Description is not valid',
      'string.empty': 'This field is required'
    }),
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
        'date.greater': 'End date must be after the start date',
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

  // const editMemberHandler = ({ role, rate, employeeId }, e) => {
  //   e.preventDefault();
  //   dispatch(membersThunks.editMember(selectedOptions, role, rate, employeeId));
  // };

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

          <Modal title={'Edit members'} isOpen={modalMember} setIsOpen={setModalMember}>
            <Table
              data={selectedOptions}
              objProp={['name', 'lastName', 'role', 'rate', 'delete']}
              headers={['Name', 'Last Name', 'Role', 'Rate', 'Delete']}
            ></Table>
            <button onClick={() => setModalMember(false)}>Cancel</button>
          </Modal>
          <button onClick={() => setModalMember(true)}>See members</button>
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
          <DropdownForm
            initialOption="Is Active?"
            label="Validated?"
            options={['true', 'false']}
            name="active"
            register={register}
            required
            error={errors.active}
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
