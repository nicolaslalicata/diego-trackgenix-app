import styles from './header.module.css';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const user = useSelector((state) => state.userLogged);
  const role = sessionStorage.getItem('role');

  const displayName = user.user.displayName == null ? role : user.user.displayName;

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
    case '/sign-up':
      pathName = 'Sign Up';
      break;
    case '/login':
      pathName = 'Login';
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
        <div className={styles.userName}>
          Hi,{' '}
          {user.user.authenticated
            ? displayName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
            : 'Anonymous'}
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
