import { useState } from 'react';
import styles from './manageItem.module.css';
import Input from '../Shared/Input';

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
      <Input
        labelText="name"
        value={userInput.name}
        onChange={(event) => onChange(event, 'name')}
      />
      <Input
        labelText="description"
        value={userInput.description}
        onChange={(event) => onChange(event, 'description')}
      />
      <Input
        labelText="client"
        value={userInput.client}
        onChange={(event) => onChange(event, 'client')}
      />
      <Input
        type="date"
        labelText="starDate"
        value={userInput.startDate}
        onChange={(event) => onChange(event, 'starDate')}
      />
      <Input
        type="date"
        labelText="endDate"
        value={userInput.endDate}
        onChange={(event) => onChange(event, 'endDate')}
      />
      <button className={styles.submit}>Submit</button>
    </form>
  );
};

export default ManageItem;
