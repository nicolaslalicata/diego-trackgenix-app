import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTasks,
  addTaskThunks,
  editTaskThunks,
  deleteTaskThunks
} from '../../redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Shared components
import TasksList from './ListTasks/TasksList';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal/index.jsx';
import Button from '../Shared/Buttons/buttons';
import InputControlled from '../Shared/InputControlled';
import Loader from '../Shared/Loading';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Input from '../Shared/Input';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasksList);
  const loader = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);

  const schema = yup.object({
    description: yup.string().required().min(10),
    workedHours: yup.number().required().positive(),
    date: yup.date().default(() => {
      return new Date();
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  const [showModal, setShowModal] = useState(false, { id: null });
  const [showModalMessage, setShowModalMessage] = useState(false, { message: '' });
  const [showEditModal, setShowEditModal] = useState(false, {
    id: '',
    description: '',
    workedHours: '',
    date: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [taskInput, setTaskInput] = useState({
    description: '',
    workedHours: '',
    date: ''
  });

  useEffect(() => {
    try {
      dispatch(getTasks());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const openModal = (id) => {
    setShowModal({
      showModal: true,
      id
    });
  };

  const addTask = ({ description, workedHours, date }) => {
    const newTask = {
      description,
      workedHours,
      date
    };

    if (description === '' && workedHours === '' && date === '') {
      setShowModalMessage({
        showModalMessage: true,
        title: 'Data missing'
      });
    } else {
      dispatch(addTaskThunks(newTask));
    }
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

  const openEditModal = (id, description, workedHours, date) => {
    setShowEditModal({
      showEditModal: true,
      id,
      description,
      workedHours,
      date
    });
  };

  const editTask = async ({ id, description, workedHours, date }) => {
    const taskEdited = {
      id,
      description,
      workedHours,
      date
    };
    dispatch(editTaskThunks(taskEdited));
  };

  const onChangeAdd = (e) => {
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };

  const addItem = (e) => {
    e.preventDefault();
    setTaskInput({
      description: '',
      workedHours: '',
      date: ''
    });
    if (taskInput.description === '' && taskInput.workedHours === '' && taskInput.date == '') {
      e.preventDefault();
      setShowModalMessage({
        showModalMessage: true,
        title: 'Data missing'
      });
    } else {
      addTask(taskInput);
      setIsAdding(false);
    }
  };

  const onChangeEdit = (e) => {
    setShowEditModal({ ...showEditModal, [e.target.name]: e.target.value });
  };

  const editItem = (e) => {
    e.preventDefault();
    if (
      showEditModal.description === '' ||
      showEditModal.workedHours === '' ||
      showEditModal.date === ''
    ) {
      setShowModalMessage({
        showModalMessage: true,
        title: 'Data missing'
      });
    } else {
      editTask(showEditModal);
      setShowEditModal({
        description: '',
        workedHours: '',
        date: ''
      });
      setShowEditModal(false);
    }
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
        <Button callback={deleteItem} text={'YES'}></Button>
        <Button callback={() => setShowModal(false)} text={'NO'}></Button>
      </Modal>
      <Modal isOpen={isAdding} setIsOpen={setIsAdding}>
        <h3>Add a new Task</h3>
        <div className={styles.contenedorModal}>
          <form onSubmit={handleSubmit(addItem)}>
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
      <Modal isOpen={showEditModal} setIsOpen={setShowEditModal}>
        <h3>Edit Task</h3>
        <div className={styles.contenedorModal}>
          <form onSubmit={editItem}>
            <div>
              <Input
                labelText={'Description:'}
                type={'text'}
                name={'description'}
                value={showEditModal.description}
                onChange={onChangeEdit}
              />
            </div>
            <div>
              <Input
                labelText={'Worked Hours:'}
                type={'text'}
                name={'workedHours'}
                value={showEditModal.workedHours}
                onChange={onChangeEdit}
              />
            </div>
            <div>
              <Input
                labelText={'Date:'}
                type={'date'}
                name={'date'}
                value={showEditModal.date}
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
      <TasksList tasklist={tasks} deleteItem={openModal} editItem={openEditModal}></TasksList>
    </div>
  );
};

export default Tasks;
