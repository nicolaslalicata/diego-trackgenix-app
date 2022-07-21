import styles from './sidebar.module.css';
import { IoMdExit } from 'react-icons/io';
import {
  BsHouseDoor,
  BsPeople,
  BsPerson,
  BsKey,
  BsClockHistory,
  BsClipboardData,
  BsClipboardPlus
} from 'react-icons/bs';
import { getAuth } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import firebaseApp from 'helpers/firebase';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const user = useSelector((state) => state.userLogged.user);
  const isAdmin = user.role === 'ADMIN';
  const isSuperAdmin = user.role === 'SUPERADMIN';
  const isEmployee = user.role === 'EMPLOYEE';
  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
    sessionStorage.clear();
  };

  return (
    <nav className={styles.navbar}>
      <input className={styles.menuToggle} id="menu-toggle" type="checkbox" />
      <label className={styles.menuButtonContainer} htmlFor="menu-toggle">
        <div className={styles.menuButton}></div>
      </label>
      <ul className={styles.menu}>
        <li>
          <a href="/">
            <span>Home</span>
            <span>
              <BsHouseDoor />
            </span>
          </a>
        </li>

        {isSuperAdmin ? (
          <li>
            <a href="/admins">
              <span>Admins</span>
              <span>
                <BsPerson />
              </span>
            </a>
          </li>
        ) : null}
        {isSuperAdmin ? (
          <li>
            <a href="/super-admin">
              <span>Super Admins</span>
              <span>
                <BsKey />
              </span>
            </a>
          </li>
        ) : null}

        {isAdmin ? (
          <li>
            <a href="/employees">
              <span>Employees</span>
              <span>
                <BsPeople />
              </span>
            </a>
          </li>
        ) : null}

        {isAdmin || isEmployee ? (
          <li>
            <a href="/projects">
              <span>Projects</span>
              <span>
                <BsClipboardData />
              </span>
            </a>
          </li>
        ) : null}

        {isAdmin || isEmployee ? (
          <li>
            <a href="/time-sheets">
              <span>Timesheets</span>
              <span>
                <BsClockHistory />
              </span>
            </a>
          </li>
        ) : null}

        {isAdmin || isEmployee ? (
          <li>
            <a href="/tasks">
              <span>Tasks</span>
              <span>
                <BsClipboardPlus />
              </span>
            </a>
          </li>
        ) : null}

        <li>
          <a onClick={signOut} href={user.authenticated ? '/' : '/auth/login'}>
            <span>{user.authenticated ? 'Logout' : 'Login'}</span>
            <span>
              <IoMdExit />
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
