import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as membersThunks from 'redux/members/thunks';
import styles from './members.module.css';

function Members() {
  const isFetchingMembers = useSelector((state) => state.members.isLoading);

  const membersList = useSelector((state) => state.members.membersList);
  const dispatch = useDispatch();
  useEffect(async () => {
    try {
      await membersThunks.getMembers()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);
  if (isFetchingMembers) {
    return <div>loading</div>;
  } else {
    return (
      <div className={styles.container}>
        {membersList.map((e, index) => {
          return <li key={index}>{e.rate}</li>;
        })}
      </div>
    );
  }
}

export default Members;
