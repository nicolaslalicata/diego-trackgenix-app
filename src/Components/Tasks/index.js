import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTasksFulfilled,
  addTaskFullfilled,
  deleteTaskFullfilled,
  editTaskFullfilled
} from '../../redux/tasks/actions';
import { getTasks } from '../../redux/tasks/thunks';

// Shared components
import TasksList from './ListTasks/TasksList';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal/index.jsx';
import Button from '../Shared/Buttons/buttons';
import Input from '../Shared/Input';
import Loader from '../Shared/Loading';
import { IoIosAddCircleOutline } from 'react-icons/io';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasksList);

  // Modals
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    // try {
    //   fetch(`${process.env.REACT_APP_API_URL}/tasks`)
    //     .then((response) => response.json())
    //     .then((response) => {
    //       dispatch(getTasksFulfilled(response.data));
    //       setIsLoading(false);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  }, []);

  const openModal = (id) => {
    setShowModal({
      showModal: true,
      id
    });
  };

  const deleteItem = () => {
    if (showModal.id) {
      fetch(`${process.env.REACT_APP_API_URL}/tasks/${showModal.id}`, { method: 'DELETE' }).then(
        () => {
          dispatch(deleteTaskFullfilled(showModal.id));
        }
      );
      setShowModal(!setShowModal);
      setShowModalMessage({
        showModalMessage: true,
        title: 'Task deleted'
      });
    }
  };

  const addTask = ({ description, workedHours, date }) => {
    const newTask = {
      description,
      workedHours,
      date
    };
    const url = `${process.env.REACT_APP_API_URL}/tasks/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: newTask.description,
        workedHours: newTask.workedHours,
        date: newTask.date
      })
    };
    try {
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            setShowModalMessage({
              showModalMessage: true,
              title: 'Task Added'
            });
            return response.json();
          }
          throw setShowModalMessage({
            showModalMessage: true,
            title: 'Error'
          });
        })
        .then((response) => {
          dispatch(addTaskFullfilled(response.data));
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
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
    if (id && description && workedHours && date) {
      const taskEdited = {
        id,
        description,
        workedHours,
        date
      };
      const url = `${process.env.REACT_APP_API_URL}/tasks/${taskEdited.id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: taskEdited.description,
          workedHours: taskEdited.workedHours,
          date: taskEdited.date
        })
      };
      try {
        fetch(url, options)
          .then((response) => {
            if (response.ok) {
              setShowModalMessage({
                showModalMessage: true,
                title: 'Task edited'
              });
              return response.json();
            }
            throw setShowModalMessage({
              showModalMessage: true,
              title: 'Error'
            });
          })
          .then((response) => {
            dispatch(editTaskFullfilled(response.data));
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onChange = (e) => {
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };
  const addItem = (e) => {
    e.preventDefault();
    addTask(taskInput);
    setTaskInput({
      description: '',
      workedHours: '',
      date: ''
    });
    setIsAdding(false);
  };

  const onChangeEdit = (e) => {
    setShowEditModal({ ...showEditModal, [e.target.name]: e.target.value });
  };

  const editItem = (e) => {
    e.preventDefault();
    editTask(showEditModal);
    setShowEditModal({
      description: '',
      workedHours: '',
      date: ''
    });
    setShowEditModal(false);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
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
          <form onSubmit={addItem}>
            <div>
              <Input
                labelText={'Description:'}
                type={'text'}
                name={'description'}
                value={taskInput.description}
                onChange={onChange}
              />
            </div>
            <div>
              <Input
                labelText={'Worked Hours:'}
                type={'text'}
                name={'workedHours'}
                value={taskInput.workedHours}
                onChange={onChange}
              />
            </div>
            <div>
              <Input
                labelText={'Date:'}
                type={'text'}
                name={'date'}
                value={taskInput.date}
                onChange={onChange}
              />
            </div>
            <div>
              <Input type="submit" value="submit" />
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
                type={'text'}
                name={'date'}
                value={showEditModal.date}
                onChange={onChangeEdit}
              />
            </div>
            <div>
              <Input type="submit" value="submit" />
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
