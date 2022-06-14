import { useState } from 'react';
import styles from './manageItem.module.css';
import Input from '../Shared/Input';
import Button from '../Shared/Buttons/buttons';

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
    <form id="projectForm" className={styles.form} onSubmit={onSubmit}>
      <tr>
        <Input
          className={styles.input}
          labelText="Name"
          value={userInput.name}
          onChange={(event) => onChange(event, 'name')}
        />
        <Input
          className={styles.input}
          labelText="Description"
          value={userInput.description}
          onChange={(event) => onChange(event, 'description')}
        />
      </tr>
      <tr>
        <Input
          className={styles.input}
          labelText="Client"
          value={userInput.client}
          onChange={(event) => onChange(event, 'client')}
        />
        <Input
          className={styles.input}
          type="date"
          labelText="Start Date"
          value={userInput.startDate}
          onChange={(event) => onChange(event, 'startDate')}
        />
      </tr>
      <Input
        className={styles.input}
        type="date"
        labelText="End Date"
        value={userInput.endDate}
        onChange={(event) => onChange(event, 'endDate')}
      />
      <Button icons="submit" />
    </form>
  );
};

export default ManageItem;
