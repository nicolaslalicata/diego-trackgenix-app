import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [taskInput, setTaskInput] = useState({
    description: '',
    workedHours: '',
    date: ''
  });

  const onChange = (e) => {
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
  };

  return (
    <div>
      <h2>Add new Task</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="description"></label>
          <input type="text" name="description" value={taskInput.description} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="workedHours"></label>
          <input type="text" name="workedHours" value={taskInput.workedHours} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="date"></label>
          <input type="text" name="date" value={taskInput.date} onChange={onChange} />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddTask;
