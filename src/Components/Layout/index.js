import Footer from '../Footer/index';
import styles from './layout.module.css';
import Header from '../Header';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
