import styles from './header.module.css';
import { withRouter } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
