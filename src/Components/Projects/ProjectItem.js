import styles from './projects.module.css';
function ProjectItem(props) {
  return (
    <tr>
      <td className={styles.tdClass}>{props.id}</td>
      <td className={styles.tdClass}>{props.name}</td>
      <td className={styles.tdClass}>{props.description}</td>
      <td className={styles.tdClass}>{props.client}</td>
      <td className={styles.tdClass}>{props.startDate}</td>
      <td className={styles.tdClass}>{props.endDate}</td>
      <td>
        <button className={styles.buttons}>Edit</button>
      </td>
      <td>
        <button className={styles.buttons}>Delete</button>
      </td>
    </tr>
  );
}
export default ProjectItem;
