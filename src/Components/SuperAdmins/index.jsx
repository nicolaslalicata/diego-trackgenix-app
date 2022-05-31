import React from 'react';
import List from './List';
import styles from './super-admins.module.css';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <div>
        <a href="/super-admins/form">
          <button>New user</button>
        </a>
        <h2>SuperAdmins</h2>
        <List />
      </div>
    </section>
  );
}

export default SuperAdmins;
