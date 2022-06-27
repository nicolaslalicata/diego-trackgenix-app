import styles from '../tasks.module.css';
import Table from '../../Shared/Table/Table';
import Button from '../../Shared/Buttons/buttons';

const TasksList = ({ tasklist, deleteItem, editItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };
  const handleEdit = (id, description, workedHours, date) => {
    editItem(id, description, workedHours, date);
  };

  const getData = () => {
    return tasklist.map((task) => ({
      ...task,
      date: new Date(task.date).toISOString().substr(0, 10),
      edit: (
        <Button
          icons="edit"
          callback={() => {
            handleEdit(task._id, task.description, task.workedHours, task.date);
          }}
        />
      ),
      delete: <Button icons="delete" callback={() => handleDelete(task._id)} />
    }));
  };
  return (
    <div className={styles.container}>
      <Table
        data={getData()}
        objProp={['description', 'workedHours', 'date', 'edit', 'delete']}
        headers={['Description', 'Worked Hours', 'Date', 'Edit', 'Delete']}
      ></Table>
    </div>
  );
};

export default TasksList;
