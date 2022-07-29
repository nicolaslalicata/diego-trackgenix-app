import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import Select from 'react-select';

import styles from './manageItem.module.css';
// import Dropdown from 'components/shared/dropdown';
import InputControlled from 'components/shared/inputControlled';
import Button from 'components/shared/buttons';
import DropdownForm from 'components/shared/dropdownForm';
import Table from 'components/shared/table';
import Modal from 'components/shared/modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getEmployees } from 'redux/employees/thunks';
import * as membersThunks from 'redux/members/thunks';
import { ButtonOption } from 'components/shared/buttonsOption';

const ManageItem = function ({ handler, project }) {
  // -------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [modalMember, setModalMember] = useState(false);
  const membersList = useSelector((state) => state.members.membersList);
  console.log(membersList);

  useEffect(() => {
    dispatch(membersThunks.getMembers());
  }, []);

  useEffect(() => {
    const mappedOpt = project.members.map(({ memberId }) => {
      return {
        role: memberId.role,
        rate: memberId.rate,
        name: memberId.employeeId.firstName,
        lastName: memberId.employeeId.lastName,
        delete: <Button icons="close" />
      };
    });
    setSelectedOptions(mappedOpt);
  }, [project.members]);

  useEffect(async () => {
    try {
      await membersThunks.getMembers()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // console.log('project', project);

  // console.log('project-member', project.members[0].memberId);
  // console.log('array members of this project', project.members);
  //---------------------------------------------------------------------------------

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
      .optional(),
    isActive: joi.boolean()
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
      name: project.name,
      client: project.client,
      description: project.description,
      startDate: new Date(project.startDate).toISOString().substr(0, 10),
      endDate: new Date(project.endDate).toISOString().substr(0, 10),
      isActive: project.isActive
    });
  }, [project]);

  const onSubmit = (data) => {
    if (project) {
      handler({ ...data, _id: project._id });
    } else {
      handler({ ...data });
    }
  };

  const options = membersList.map((e) => {
    return { value: `${e._id}`, label: `${e.employeeId.lastName}` };
  });

  return (
    <div className={styles.formContainer}>
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
            {/* <Modal title={'Edit members'} isOpen={modalMember} setIsOpen={setModalMember}>
              <Table
                data={selectedOptions}
                objProp={['name', 'lastName', 'role', 'rate', 'delete']}
                headers={['Name', 'Last Name', 'Role', 'Rate', 'Delete']}
              ></Table>
            </Modal> */}
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
            {/* <DropdownForm
              initialOption={project.isActive ? 'Active' : 'Inactive'}
              label="Validated?"
              options={['true', 'false']}
              name="isActive"
              register={register}
              required
              error={errors.isActive}
            /> */}
          </div>
        </div>
        <div className={styles.selectContianer}>
          <Select
            defaultValue={[options[0], options[2]]}
            isMulti
            options={options}
            onChange={(item) => setSelectedOptions(item)}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
          />
        </div>
        <div className={styles.buttonConteiner}>
          <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
          <ButtonOption option={'no'} text={'Cancel'}></ButtonOption>
        </div>
      </form>
      {/* <button onClick={() => setModalMember(true)}>See members</button> */}
    </div>
  );
};

export default ManageItem;
