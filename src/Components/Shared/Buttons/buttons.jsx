import { IoMdSend, IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import styles from './buttons.module.css';
import { BsX } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';

const Button = ({ text, callback, icons }) => {
  const IconToShow = () => {
    if (icons === 'add') {
      return <IoIosAddCircleOutline />;
    } else if (icons === 'edit') {
      return <BsThreeDots />;
    } else if (icons === 'delete') {
      return <BsX className={styles.delete} />;
    } else if (icons === 'submit') {
      return <IoMdSend />;
    } else if (icons === 'close') {
      return <IoIosClose />;
    } else return null;
  };

  return (
    <button onClick={callback} className={styles.button}>
      {text}
      <IconToShow />
    </button>
  );
};

export default Button;
