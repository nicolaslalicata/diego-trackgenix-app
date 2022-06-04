import React, { useState } from 'react';
import styles from '../tasks.module.css';

const AddTask = ({ showAddTask, setShowAddTask, addTask }) => {
  const [taskInput, setTaskInput] = useState({
    description: '',
    workedHours: '',
    date: ''
  });

  const onChange = (e) => {
    console.log(e);
    setTaskInput({ ...taskInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTask(taskInput);
    setTaskInput({
      description: '',
      workedHours: '',
      date: ''
    });
    setShowAddTask(false);
  };
  return (
    <>
      {showAddTask && (
        <div>
          <form onSubmit={onSubmit}>
            <button className={styles.closeForm} onClick={() => setShowAddTask(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={taskInput.description}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="workedHours">Worked Hours:</label>
              <input
                type="text"
                name="workedHours"
                value={taskInput.workedHours}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="text" name="date" value={taskInput.date} onChange={onChange} />
            </div>
            <div>
              <input type="submit" value="submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default AddTask;
