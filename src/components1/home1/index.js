import styles from './home.module.css';
import clock from './Assets/clock.jpg';

function Home() {
  return (
    <section className={styles.container}>
      <h2 className={styles.tittle}>Welcome to Trackgenix!</h2>
      <div className={styles.homeContent}>
        <h3 className={styles.homeh3}>A free website for everyone at Trackgenix!</h3>
        <img src={clock} className={styles.homeIco} alt="clock img" />
      </div>
      <p className={styles.homeP}>
        Here, you can register the hours worked in any project for all employees, generate reports
        and much more.
      </p>
    </section>
  );
}

export default Home;
