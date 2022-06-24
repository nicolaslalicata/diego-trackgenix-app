import styles from './header.module.css';
import { Link, withRouter } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/admins">admins</Link>
          </li>
          <li>
            <Link to="/super-admins">super admins</Link>
          </li>
          <li>
            <Link to="/employees">employees</Link>
          </li>
          <li>
            <Link to="/projects">projects</Link>
          </li>
          <li>
            <Link to="/time-sheets">timesheets</Link>
          </li>
          <li>
            <Link to="/tasks">tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Header);
