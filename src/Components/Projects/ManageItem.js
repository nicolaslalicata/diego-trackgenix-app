import { useState } from 'react';
import styles from './manageItem.module.css';

const ManageItem = function ({ handler, project }) {
  const defaultValue = {
    client: '',
    description: '',
    endDate: '',
    isActive: false,
    members: [],
    name: '',
    startDate: ''
  };
  const [userInput, setUserInput] = useState(project ? project : defaultValue);

  const onChange = (event, key) => {
    let newValue = '';

    if (key === 'isActive') {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    setUserInput({ ...userInput, [key]: newValue });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handler(userInput);
    setUserInput({
      client: '',
      description: '',
      endDate: '',
      isActive: true,
      members: [],
      name: '',
      startDate: ''
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" value={userInput.name} onChange={(event) => onChange(event, 'name')} />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        value={userInput.description}
        onChange={(event) => onChange(event, 'description')}
      />
      <label htmlFor="client">Client</label>
      <input id="client" value={userInput.client} onChange={(event) => onChange(event, 'client')} />
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="startDate"
        value={userInput.startDate}
        onChange={(event) => onChange(event, 'startDate')}
      />
      <label htmlFor="endDate">End Date</label>
      <input
        type="date"
        id="endDate"
        value={userInput.endDate}
        onChange={(event) => onChange(event, 'endDate')}
      />
      <button className={styles.submit}>Submit</button>
    </form>
  );
};

export default ManageItem;
