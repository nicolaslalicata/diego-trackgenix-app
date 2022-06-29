import styles from './header.module.css';
import { withRouter } from 'react-router-dom';

function Header() {
  const path = window.location.pathname;
  let pathName = '';
  switch (path) {
    case '/':
      pathName = 'Home';
      break;
    case '/admins':
      pathName = 'Admins';
      break;
    case '/super-admins':
      pathName = 'Super Admins';
      break;
    case '/employees':
      pathName = 'Employees';
      break;
    case '/projects':
      pathName = 'Projects';
      break;
    case '/time-sheets':
      pathName = 'Timesheets';
      break;
    case '/tasks':
      pathName = 'Tasks';
      break;
    default:
      pathName = '';
      break;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
        <div className={styles.tittle}>{pathName}</div>
      </div>
    </header>
  );
}

export default withRouter(Header);
