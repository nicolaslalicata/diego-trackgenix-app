import styles from './Button.module.css';

const Button = function ({ text, callback, size }) {
  let className;
  if (size === 'small') {
    className = styles.small;
  } else if (size === 'medium') {
    className = styles.medium;
  }
  return (
    <button onClick={callback} className={className}>
      {text}
    </button>
  );
};
// const myCallback = () => {};
// <Button text="description" callback={myCallback} />

export default Button;
