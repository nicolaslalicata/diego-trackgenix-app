import Footer from 'components/footer';
import styles from './layout.module.css';
import Header from 'components/header';
import Sidebar from 'components/sidebar';

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