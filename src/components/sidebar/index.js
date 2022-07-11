import React from 'react';
import { useSelector } from 'react-redux';

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

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);
  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
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
              <a href="/">
                <BsHouseDoor />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a href="/admins">
            <span>Admins</span>
            <span>
              <a href="/admins">
                <BsPerson />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a href="/super-admin">
            <span>Super Admins</span>
            <span>
              <a href="/super-admins">
                <BsKey />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a href="/employees">
            <span>Employees</span>
            <span>
              <a href="/employees">
                <BsPeople />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a href="/projects">
            <span>Projects</span>
            <span>
              <a href="/projects">
                <BsClipboardData />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a href="/time-sheets">
            <span>Timesheets</span>
            <span>
              <a href="/time-sheets">
                <BsClockHistory />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a href="/tasks">
            <span>Tasks</span>
            <span>
              <a href="/tasks">
                <BsClipboardPlus />
              </a>
            </span>
          </a>
        </li>

        <li>
          <a onClick={signOut} href={user ? '/' : '/auth/login'}>
            <span>{user ? 'Logout' : 'Login'}</span>
            <span>
              <a href={user ? '/' : '/auth/login'}>
                <IoMdExit />
              </a>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
