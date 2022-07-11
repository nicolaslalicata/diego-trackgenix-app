import Footer from 'components/footer';
import styles from './layout.module.css';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/user/thunks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from 'helpers/firebase';

function Layout({ children }) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const email = sessionStorage.getItem('email');
  const role = sessionStorage.getItem('role');
  const userNAme = `${email} (${role})`;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('cambiando');
      dispatch(setUser(userNAme, true));
    } else {
      // User is signed out
      dispatch(setUser('', false));
    }
  });
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Sidebar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
