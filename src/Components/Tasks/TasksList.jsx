import styles from './tasks.module.css';
import ListItem from './ListItem';

const TasksList = ({ tasklist, deleteItem }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Worked Hours</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasklist.map((item) => {
            return <ListItem key={item._id} tasksItem={item} deleteItem={deleteItem} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
