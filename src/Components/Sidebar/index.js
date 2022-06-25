import React from 'react';
import styles from './sidebar.module.css';
import { AiFillHome, AiOutlineTeam, AiOutlineTable, AiOutlineOrderedList } from 'react-icons/ai';

const Sidebar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menuItems}>
        <div className={styles.centerItems}>
          <li>
            <a href="/">
              <AiFillHome /> Home
            </a>
          </li>
        </div>
        <li>
          <a href="/admins">
            <AiOutlineTeam />
            Admins
          </a>
        </li>
        <li>
          <a href="/super-admins">
            <AiOutlineTeam />
            Super Admins
          </a>
        </li>
        <li>
          <a href="/employees">
            <AiOutlineTeam />
            Employees
          </a>
        </li>
        <li>
          <a href="/projects">
            <AiOutlineTeam />
            Projects
          </a>
        </li>
        <li>
          <a href="/time-sheets">
            <AiOutlineTable />
            Timesheets
          </a>
        </li>
        <li>
          <a href="/tasks">
            <AiOutlineOrderedList />
            Tasks
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
