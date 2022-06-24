import styles from './sidebar.module.css';
import { Link, withRouter } from 'react-router-dom';

function SideBar() {
  return (
    <div>
      <nav className={styles.sidebar}>
        <ul className={styles.rutes}>
          <li>
            <Link className={styles.navLink} to="/admins">
              Admins
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/super-admins">
              Super-Admins
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/employees">
              Employees
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/projects">
              Projects
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/time-sheets">
              Timesheets
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} to="/tasks">
              Tasks
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(SideBar);
