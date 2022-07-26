import Footer from 'components/footer';
import styles from './layout.module.css';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/auth/thunks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// eslint-disable-next-line no-unused-vars
import firebaseApp from 'helpers/firebase';

function Layout({ children }) {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const displayName = sessionStorage.getItem('displayName');
  const auth = getAuth();

  let userLogged = {
    displayName: displayName === 'null' ? role : displayName,
    role: sessionStorage.getItem('role'),
    authenticated: token ? true : false,
    localId: sessionStorage.getItem('localId')
  };

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      userLogged = {
        displayName: '',
        role: '',
        authenticated: false,
        localId: ''
      };
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
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
