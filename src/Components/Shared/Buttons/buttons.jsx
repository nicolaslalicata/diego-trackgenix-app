import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { IoMdSend, IoIosAddCircleOutline, IoIosClose } from 'react-icons/io';
import styles from './buttons.module.css';

const Button = ({ text, callback, icons }) => {
  const IconToShow = () => {
    if (icons === 'add') {
      return <IoIosAddCircleOutline />;
    } else if (icons === 'edit') {
      return <FiEdit />;
    } else if (icons === 'delete') {
      return <MdDeleteForever />;
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
