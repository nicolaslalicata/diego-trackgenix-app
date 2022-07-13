import Footer from 'components/footer';
import styles from './layout.module.css';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/auth/thunks';
import { getAuth } from 'firebase/auth';
import firebaseApp from 'helpers/firebase';

function Layout({ children }) {
  const auth = getAuth();

  const user = auth.currentUser;
  const token = sessionStorage.getItem('role');

  const userLogged = {
    displayName: sessionStorage.getItem('displayName'),
    role: sessionStorage.getItem('role'),
    authenticated: token ? true : false
  };
  console.log('layout', userLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('role');
    if (token) {
      dispatch(setUser(userLogged));
    }
  }, []);

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
