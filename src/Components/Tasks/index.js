require('dotenv').config();
import { useEffect, useState } from 'react';
import TasksList from './ListTasks/TasksList';
import styles from './tasks.module.css';
import Modal from './Modal/TasksModal';
import AddTask from './AddTask/AddTask';

const Tasks = () => {
  const [taskList, setTasksList] = useState([]);
  const [modalState, setModalState] = useState(false, { id: null });
  const [modalStateAddTask, setModalStateAddTask] = useState(false);
  const [modalStateAdd, setModalStateAdd] = useState(false, { id: null });
  const [modalStateDelete, setModalStateDelete] = useState(false, { id: null });

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
    setModalState({
      setModalState: true,
      id
    });
  };

  const deleteItem = () => {
    if (modalState.id) {
      fetch(`${process.env.REACT_APP_API_URL}/tasks/${modalState.id}`, { method: 'DELETE' }).then(
        setTasksList([...taskList.filter((listItem) => listItem._id !== modalState.id)])
      );
      setModalState(!modalState);
      setModalStateDelete(!modalStateDelete);
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
      fetch(url, options).then((response) => response.json());
      setModalStateAdd(!modalStateAdd);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setModalStateAddTask(true)}>
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
      <Modal modalState={modalState} setModalState={setModalState} tittle={'Are you sure?'}>
        <button onClick={deleteItem}>Yes</button>
      </Modal>
      <Modal
        modalState={modalStateAdd}
        setModalState={setModalStateAdd}
        tittle={'Task added'}
      ></Modal>
      <Modal
        modalState={modalStateDelete}
        setModalState={setModalStateDelete}
        tittle={'Task deleted'}
      ></Modal>
      <AddTask
        modalStateAddTask={modalStateAddTask}
        setModalStateAddTask={setModalStateAddTask}
        addTask={addTask}
      ></AddTask>
      <TasksList tasklist={taskList} deleteItem={openModal}></TasksList>
    </div>
  );
};

export default Tasks;
