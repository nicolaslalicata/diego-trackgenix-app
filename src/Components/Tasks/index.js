require('dotenv').config();
import { useEffect, useState } from 'react';
import TasksList from './ListTasks/TasksList';
import styles from './tasks.module.css';
import Modal from './Modal/TasksModal';
import AddTask from './AddTask/AddTask';

// cambiar a showModal...
const Tasks = () => {
  const [taskList, setTasksList] = useState([]);
  const [showModal, setShowModal] = useState(false, { id: null });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showModalTaskAdded, setShowModalTaskAdded] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false, { id: null });
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/tasks`)
        .then((response) => response.json())
        .then((response) => {
          setTasksList(response.data);
        });
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

  const deleteItem = () => {
    if (showModal.id) {
      fetch(`${process.env.REACT_APP_API_URL}/tasks/${showModal.id}`, { method: 'DELETE' }).then(
        setTasksList([...taskList.filter((listItem) => listItem._id !== showModal.id)])
      );
      setShowModal(!setShowModal);
      setShowModalDelete(!showModalDelete);
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
            setShowModalTaskAdded(!showModalTaskAdded);
            return response.json();
          }
          throw setShowModalError({
            showModal: true
          });
        })
        .then((data) => {
          setTasksList([...taskList, data.newTaskDone]);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setShowAddTask(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} tittle={'Are you sure?'}>
        <button onClick={deleteItem}>Yes</button>
      </Modal>
      <Modal
        showModal={showModalTaskAdded}
        setShowModal={setShowModalTaskAdded}
        tittle={'Task added'}
      ></Modal>
      <Modal
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
        tittle={'Task deleted'}
      ></Modal>
      <Modal showModal={showModalError} setShowModal={setShowModalError} tittle={'Error'}></Modal>
      <AddTask
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        addTask={addTask}
      ></AddTask>
      <TasksList tasklist={taskList} deleteItem={openModal}></TasksList>
    </div>
  );
};

export default Tasks;
