import styles from '../tasks.module.css';
import Table from 'components/shared/table';
import Button from 'components/shared/buttons';

const TasksList = ({ tasklist, deleteItem, editItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };
  const handleEdit = (id, description, workedHours, date, employeeId, projectId, done) => {
    editItem(id, description, workedHours, date, employeeId, projectId, done);
  };

  const getData = () => {
    return tasklist.map((task) => ({
      ...task,
      employee: task.employeeId ? task.employeeId.lastName : '',
      done: task.done ? 'Yes' : 'No',
      project: task.projectId ? task.projectId.name : '',
      date: new Date(task.date).toISOString().substr(0, 10),
      edit: (
        <Button
          icons="edit"
          callback={() => {
            handleEdit(
              task._id,
              task.description,
              task.workedHours,
              task.date,
              task.employeeId ? task.employeeId._id : '',
              task.projectId ? task.projectId._id : '',
              task.done
            );
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
        objProp={[
          'project',
          'description',
          'employee',
          'workedHours',
          'date',
          'done',
          'edit',
          'delete'
        ]}
        headers={[
          'Project',
          'Description',
          'Employee',
          'Worked Hours',
          'Date',
          'Done',
          'Edit',
          'Delete'
        ]}
      ></Table>
    </div>
  );
};

export default TasksList;
