require('dotenv').config();
import { useEffect, useState } from 'react';
import TasksList from './ListTasks/TasksList';
import styles from './tasks.module.css';
import Modal from './Modal/TasksModal';
import AddTask from './AddTask/AddTask';

const Tasks = () => {
  const [taskList, setTasksList] = useState([]);

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
  const [modalState, setModalState] = useState(false, { id: null });

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
    console.log(newTask.description);
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(options.body);
      });
  };

  return (
    <div className={styles.container}>
      <Modal modalState={modalState} setModalState={setModalState}>
        <h2>Are you sure?</h2>
        <button onClick={deleteItem}>Yes</button>
      </Modal>
      <AddTask addTask={addTask}></AddTask>
      <TasksList tasklist={taskList} deleteItem={openModal}></TasksList>
    </div>
  );
};

export default Tasks;
