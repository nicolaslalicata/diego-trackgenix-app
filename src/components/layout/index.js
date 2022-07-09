import Footer from 'components/footer';
import styles from './layout.module.css';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'redux/user/thunks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Layout({ children }) {
  const userLogged = useSelector((state) => state.user.email);
  const name = sessionStorage.getItem('user');
  const auth = getAuth();
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(name, true));
      console.log(name, user);
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
