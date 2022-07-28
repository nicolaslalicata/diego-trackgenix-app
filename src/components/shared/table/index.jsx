import React from 'react';
import styles from './table.module.css';
import { useState, useEffect } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';

const Table = ({ data, headers, objProp }) => {
  const [indexPage, setIndexPage] = useState(1);
  const pageData = data.slice(5 * (indexPage - 1), 5 * indexPage);
  const totalPages = Math.ceil(data.length / 5);

  useEffect(() => {
    const maxIndexPage = data.length > 5 ? Math.floor((data.length - 0.01) / 5) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
  }, [data]);
  const nextPage = () => {
    if (data.length / 5 > indexPage) {
      setIndexPage(indexPage + 1);
    }
  };
  const previousPage = () => {
    if (indexPage > 1) {
      setIndexPage(indexPage - 1);
    }
  };

  if (data.length === 0) {
    return <div>Empty table: no data</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
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
        {totalPages > 1 && (
          <div className={styles.pageButtons}>
            <button onClick={() => previousPage()}>
              <FcPrevious />
            </button>
            <p>
              Page {indexPage} of {totalPages}
            </p>
            <button onClick={() => nextPage()}>
              <FcNext />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
