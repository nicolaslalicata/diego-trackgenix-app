import Footer from '../Footer/index';
import styles from './layout.module.css';
import Header from '../Header';
// import SideBar from '../Shared/SideBar/SideBar';
function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
