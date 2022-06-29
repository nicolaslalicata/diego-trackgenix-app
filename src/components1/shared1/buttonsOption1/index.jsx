import styles from './buttonsOption.module.css';

export const ButtonOption = ({ option, text, callback }) => {
  if (option === 'yes') {
    return (
      <button onClick={callback} className={styles.buttonYes}>
        {text}
      </button>
    );
  } else if (option === 'no') {
    return (
      <button onClick={callback} className={styles.buttonNo}>
        {text}
      </button>
    );
  }
};
