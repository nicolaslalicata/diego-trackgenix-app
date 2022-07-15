import React from 'react';
import styles from './table.module.css';
import { useState, useEffect } from 'react';
const Table = ({ data, headers, objProp }) => {
  const [indexPage, setIndexPage] = useState(1);
  const pageData = data.slice(10 * (indexPage - 1), 10 * indexPage);
  useEffect(() => {
    const maxIndexPage = data.length > 10 ? Math.floor((data.length - 0.01) / 10) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
  }, [data]);
  const nextPage = () => {
    if (data.length / 10 > indexPage) {
      setIndexPage(indexPage + 1);
    }
  };
  const previousPage = () => {
    if (indexPage > 1) {
      setIndexPage(indexPage - 1);
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {pageData.map((row) => {
            return (
              <tr key={row._id}>
                {objProp.map((prop, index) => {
                  return <td key={index}>{row[prop]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => nextPage()}>next</button>
      <button onClick={() => previousPage()}>prev</button>
      <p>Page {indexPage}</p>
    </div>
  );
};

export default Table;
