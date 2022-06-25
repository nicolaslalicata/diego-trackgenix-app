import Footer from '../Footer/index';
import styles from './layout.module.css';
import Header from '../Header';
import Sidebar from '../Sidebar';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div className={styles.body}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
