import Footer from 'components/footer';
import styles from './layout.module.css';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useSelector } from 'react-redux';
import Loginuser from 'components/login';
import Home from 'components/home';

function Layout({ children }) {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div className={styles.container}>
        <Header />
        <Sidebar />
        {user ? <div className={styles.body}>{children}</div> : <Loginuser />}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
