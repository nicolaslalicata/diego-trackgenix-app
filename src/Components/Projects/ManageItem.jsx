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
      <div className={styles.inputConteiner}>
        <div>
          <Input
            className={styles.input}
            labelText="Name"
            value={userInput.name}
            inputStyle={{ width: '74%' }}
            onChange={(event) => onChange(event, 'name')}
          />
          <Input
            className={styles.input}
            labelText="Description"
            value={userInput.description}
            inputStyle={{ width: '74%' }}
            onChange={(event) => onChange(event, 'description')}
          />
          <Input
            className={styles.input}
            labelText="Client"
            value={userInput.client}
            inputStyle={{ width: '74%' }}
            onChange={(event) => onChange(event, 'client')}
          />
        </div>
        <div>
          <Input
            className={styles.input}
            type="date"
            labelText="Start Date"
            value={userInput.startDate}
            inputStyle={{ width: '90%', height: '14px' }}
            onChange={(event) => onChange(event, 'startDate')}
          />
          <Input
            className={styles.input}
            type="date"
            labelText="End Date"
            value={userInput.endDate}
            inputStyle={{ width: '90%', height: '14px' }}
            onChange={(event) => onChange(event, 'endDate')}
          />
        </div>
      </div>
      <Button icons="submit" />
    </form>
  );
};

export default ManageItem;
