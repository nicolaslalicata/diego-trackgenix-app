import React from 'react';
import styles from './sidebar.module.css';
import { AiFillHome, AiOutlineTeam, AiOutlineTable, AiOutlineOrderedList } from 'react-icons/ai';
import { useState } from 'react';

const Sidebar = () => {
  return (
    <nav className={styles.navbar}>
      <input className={styles.menuToggle} id="menu-toggle" type="checkbox" />
      <label className={styles.menuButtonContainer} htmlFor="menu-toggle">
        <div className={styles.menuButton}></div>
      </label>
      <ul className={styles.menuItems}>
        <li>
          <a href="/">
            <AiFillHome /> Home
          </a>
        </li>
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
