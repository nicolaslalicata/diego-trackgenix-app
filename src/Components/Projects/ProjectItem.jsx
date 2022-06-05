import styles from './projects.module.css';

function ProjectItem(props) {
  const deleteItem = () => {
    props.deleteHandler(props.id);
  };
  const editHandler = () => {
    props.editHandler(props);
  };
  return (
    <tr>
      <td className={styles.tdClass}>{props.name}</td>
      <td className={styles.tdClass}>{props.description}</td>
      <td className={styles.tdClass}>{props.client}</td>
      <td className={styles.tdClass}>{new Date(props.startDate).toISOString().substr(0, 10)}</td>
      <td className={styles.tdClass}>{new Date(props.endDate).toISOString().substr(0, 10)}</td>
      <td>
        <button className={styles.buttons} onClick={editHandler}>
          Edit!
        </button>
      </td>
      <td>
        <button className={styles.buttons} onClick={deleteItem}>
          Delete!
        </button>
      </td>
    </tr>
  );
}
export default ProjectItem;
