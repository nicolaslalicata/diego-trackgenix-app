import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { IoMdSend, IoIosAddCircleOutline } from 'react-icons/io';
import styles from './buttons.module.css';

const Button = ({ text, callback, icons, buttonStyle }) => {
  const IconToShow = () => {
    if (icons === 'add') {
      return <IoIosAddCircleOutline />;
    } else if (icons === 'edit') {
      return <FiEdit />;
    } else if (icons === 'delete') {
      return <MdDeleteForever />;
    } else if (icons === 'submit') {
      return <IoMdSend />;
    } else return null;
  };

  return (
    <button onClick={callback} className={styles.button} style={buttonStyle}>
      {text}
      <IconToShow />
    </button>
  );
};

export default Button;
