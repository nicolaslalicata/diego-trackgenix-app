import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, addTaskThunks, editTaskThunks, deleteTaskThunks } from 'redux/tasks/thunks';
import * as projectsThunks from 'redux/projects/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Shared components
import TasksList from 'components/tasks/listTasks/tasksList';
import styles from './tasks.module.css';
import Modal from 'components/shared/modal';
import Button from 'components/shared/buttons';
import { ButtonOption } from 'components/shared/buttonsOption';
import InputControlled from 'components/shared/inputControlled';
import Loader from 'components/shared/loading';
import { IoIosAddCircleOutline } from 'react-icons/io';
import DropdownForm from 'components/shared/dropdownForm';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasksList);
  const employees = useSelector((state) => state.employees.employeesList);
  const projects = useSelector((state) => state.projects.projectsList);
  const loader = useSelector((state) => state.tasks.isLoading);

  const [showModal, setShowModal] = useState(false, { id: null });
  const [isModalDelete, setIsModalDelete] = useState(false, { id: null });
  const [showModalMessage, setShowModalMessage] = useState(false, { message: '' });
  const [showEditModal, setShowEditModal] = useState(false, {
    id: '',
    description: '',
    workedHours: '',
    date: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const schema = Joi.object({
    projectId: Joi.string().required(),
    employeeId: Joi.string().required(),
    description: Joi.string().required().min(10).trim(),
    workedHours: Joi.number().required().positive(),
    done: Joi.boolean().required(),
    date: Joi.date().default(() => {
      return new Date();
    })
  });

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    try {
      dispatch(getTasks());
      projectsThunks.getProjects()(dispatch);
      employeesThunks.getEmployees()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addTask = ({ description, workedHours, date, employeeId, projectId, done }, e) => {
    e.preventDefault();
    const newTask = { description, workedHours, date, employeeId, projectId, done };
    setShowModal(true);
    dispatch(addTaskThunks(newTask));
    setIsAdding(false);
    reset();
    setShowModalMessage({
      showModalMessage: true,
      title: 'Message',
      message: 'Task created'
    });
    setShowModal(false);
  };

  const editItem = (id, description, workedHours, date, employeeId, projectId, done) => {
    setShowModal(true);
    setIsAdding(false);
    const dateFormated = new Date(date).toISOString().substr(0, 10);
    setShowEditModal({
      showEditModal: true,
      id,
      description,
      workedHours,
      date: dateFormated
    });
    setValue('description', description);
    setValue('workedHours', workedHours);
    setValue('date', dateFormated);
    setValue('employeeId', employeeId);
    setValue('projectId', projectId);
    setValue('done', done);
  };

  const editTask = async (data) => {
    const taskEdited = {
      id: showEditModal.id,
      description: data.description,
      workedHours: data.workedHours,
      date: data.date,
      employeeId: data.employeeId,
      projectId: data.projectId,
      done: data.done
    };
    dispatch(editTaskThunks(taskEdited));
    setShowModal(false);
    reset();
    setShowModalMessage({
      showModalMessage: true,
      title: 'Message',
      message: 'Task edited'
    });
  };

  const openDeleteModal = (id) => {
    setIsModalDelete({
      isModalDelete: true,
      id
    });
  };

  const deleteItem = () => {
    if (isModalDelete.id) {
      dispatch(deleteTaskThunks(isModalDelete.id));
    }
    setIsModalDelete(!setIsModalDelete);
    setShowModalMessage({
      showModalMessage: true,
      title: 'Message',
      message: 'Task deleted'
    });
  };

  if (loader) {
    return <Loader isLoading={loader} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        {/* Add button */}
        <Button
          callback={() => {
            setShowModal(true);
            setIsAdding(true);
          }}
          icons={'add'}
        >
          <IoIosAddCircleOutline />
        </Button>
        {/* Modal for deleting task */}
        <Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete} title={'Delete task'}>
          <h3>Are you sure?</h3>
          <div className={styles.ButtonContainer}>
            <ButtonOption callback={deleteItem} option={'yes'} text={'Confirm'}></ButtonOption>
            <ButtonOption
              option={'no'}
              callback={() => {
                setIsModalDelete(false);
                reset();
              }}
              text={'Cancel'}
            ></ButtonOption>
          </div>
        </Modal>
        {/* Modal for adding/editing task */}
        <Modal
          isOpen={showModal}
          setIsOpen={setShowModal}
          reset={reset}
          title={isAdding ? 'Add tasks' : 'Edit Task'}
        >
          <div className={styles.contenedorModal}>
            <form onSubmit={handleSubmit(isAdding ? addTask : editTask)}>
              <div className={styles.modalContent}>
                <div className={styles.modalColumn}>
                  <div>
                    <DropdownForm
                      initialOption={'Select a project'}
                      label="Projects"
                      options={projects}
                      name="projectId"
                      register={register}
                      required
                      error={errors.projectId}
                    />
                  </div>
                  <div>
                    <DropdownForm
                      initialOption="Select an employee"
                      label="Employees"
                      options={employees}
                      name="employeeId"
                      register={register}
                      required
                      error={errors.employeeId}
                    />
                  </div>
                  <div>
                    <InputControlled
                      type={'text'}
                      label={'Description'}
                      name="description"
                      register={register}
                      required
                      error={errors.description}
                    />
                  </div>
                </div>
                <div className={styles.modalColumn}>
                  <div>
                    <InputControlled
                      type={'text'}
                      label={'Worked Hours'}
                      name="workedHours"
                      register={register}
                      required
                      error={errors.workedHours}
                    />
                  </div>
                  <div>
                    <InputControlled
                      type={'date'}
                      label={'Date'}
                      name="date"
                      register={register}
                      required
                      error={errors.date}
                    />
                  </div>
                  <div>
                    <InputControlled
                      type={'checkbox'}
                      label={'Done'}
                      name="done"
                      register={register}
                      required
                      error={errors.done}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.modalbuttons}>
                <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
                <ButtonOption
                  option={'no'}
                  callback={() => {
                    setShowModal(false);
                    reset();
                  }}
                  text={'Cancel'}
                ></ButtonOption>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          isOpen={showModalMessage}
          setIsOpen={setShowModalMessage}
          title={showModalMessage.title}
          reset={reset}
        >
          <div className={styles.modalMessage}>{showModalMessage.message}</div>
        </Modal>
        <TasksList tasklist={tasks} deleteItem={openDeleteModal} editItem={editItem}></TasksList>
      </div>
    </div>
  );
};

export default Tasks;
