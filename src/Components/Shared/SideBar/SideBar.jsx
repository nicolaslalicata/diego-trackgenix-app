import React from 'react';
import styles from './sideBar.module.css';
const SideBar = () => {
  return (
    <aside className={styles.leftBar}>
      <div className={styles.conteinerInput}>
        <input />
      </div>
      <div className={styles.sideBarChild}>
        <p className={styles.menu}>MENU</p>
        <nav className={styles.sideBarChild}>
          <ul>
            <li>
              <a href="index.html">home</a>
            </li>
            <li>
              <a href="signUp.html">Sing Up</a>
            </li>
            <li>
              <a href="login.html">Log In</a>
            </li>
          </ul>
        </nav>
        <h2 className={styles.menu}>Get in touch</h2>
        <p className={styles.pGetintouch}>
          Sed varius enim lorem ullamcorper dolore aliquam aenean ornare velit lacus, ac varius enim
          lorem ullamcorper dolore. Proin sed aliquam facilisis ante interdum. Sed nulla amet lorem
          feugiat tempus aliquam.
        </p>

        <div className={styles.sideBarChildTwoLogos}>
          <a href="#">information@trackgenix.tld</a>
        </div>
        <div className={styles.sideBarChildTwoLogos}>
          <a href="#">1234 Somewhere Road #8254 Nashville, TN 00000-0000</a>
        </div>
        <div className={styles.sideBarChildTwoLogos}>
          <a href="#">(000) 000-0000</a>
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
