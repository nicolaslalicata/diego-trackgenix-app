import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTasks,
  addTaskThunks,
  editTaskThunks,
  deleteTaskThunks
} from '../../redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Shared components
import TasksList from './ListTasks/TasksList';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal/index.jsx';
import Button from '../Shared/Buttons/buttons';
import InputControlled from '../Shared/InputControlled';
import Loader from '../Shared/Loading';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasksList);
  const loader = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);

  const [showModal, setShowModal] = useState(false, { id: null });
  const [showModalMessage, setShowModalMessage] = useState(false, { message: '' });
  const [showEditModal, setShowEditModal] = useState(false, {
    id: '',
    description: '',
    workedHours: '',
    date: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const schema = Joi.object({
    description: Joi.string().required().min(10).trim(),
    workedHours: Joi.number().required().positive(),
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
    } catch (error) {
      console.error(error);
    }
  }, []);

  const openDeleteModal = (id) => {
    setShowModal({
      showModal: true,
      id
    });
  };

  const deleteItem = () => {
    if (showModal.id) {
      dispatch(deleteTaskThunks(showModal.id));
    }
    setShowModal(!setShowModal);
    setShowModalMessage({
      showModalMessage: true,
      title: 'Task deleted'
    });
  };

  const onChangeEdit = (e) => {
    setShowEditModal({ ...showEditModal, [e.target.name]: e.target.value });
  };

  const editItem = (id, description, workedHours, date) => {
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
  };

  const editTask = async (data) => {
    const taskEdited = {
      id: showEditModal.id,
      description: data.description,
      workedHours: data.workedHours,
      date: data.date
    };
    dispatch(editTaskThunks(taskEdited));
    setShowEditModal(false);
    reset();
    setShowModalMessage({
      showModalMessage: true,
      title: 'Task edited'
    });
  };

  const addTask = ({ description, workedHours, date }, e) => {
    e.preventDefault();
    const newTask = { description, workedHours, date };
    dispatch(addTaskThunks(newTask));
    setIsAdding(false);
    reset();
    setShowModalMessage({
      showModalMessage: true,
      title: 'Task added'
    });
  };

  if (error) {
    return <Loader isLoading={loader} />;
  }
  if (loader) {
    return <Loader isLoading={loader} />;
  }
  return (
    <div className={styles.container}>
      <Button callback={() => setIsAdding(true)} icons={'add'}>
        <IoIosAddCircleOutline />
      </Button>
      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <h3>Are you sure?</h3>
        <div>
          <Button callback={deleteItem} text={'YES'}></Button>
          <Button callback={() => setShowModal(false)} text={'NO'}></Button>
        </div>
      </Modal>
      <Modal isOpen={isAdding} setIsOpen={setIsAdding} reset={reset}>
        <h3>Add a new Task</h3>
        <div className={styles.contenedorModal}>
          <form onSubmit={handleSubmit(addTask)}>
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
              <Button text="Add task"></Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpen={showEditModal} setIsOpen={setShowEditModal} reset={reset}>
        <h3>Edit Task</h3>
        <div className={styles.contenedorModal}>
          <form onSubmit={handleSubmit(editTask)}>
            <div>
              <InputControlled
                type={'text'}
                label={'Description'}
                name="description"
                register={register}
                required
                error={errors.description}
                // value={showEditModal.description}
                onChange={onChangeEdit}
              />
            </div>
            <div>
              <InputControlled
                type={'text'}
                label={'Worked Hours'}
                name="workedHours"
                register={register}
                required
                error={errors.workedHours}
                // value={showEditModal.workedHours}
                onChange={onChangeEdit}
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
                // value={showEditModal.date}
                onChange={onChangeEdit}
              />
            </div>
            <div>
              <Button text="Edit task"></Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={showModalMessage}
        setIsOpen={setShowModalMessage}
        title={showModalMessage.title}
      ></Modal>
      <TasksList tasklist={tasks} deleteItem={openDeleteModal} editItem={editItem}></TasksList>
    </div>
  );
};

export default Tasks;
