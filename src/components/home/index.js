import styles from './home.module.css';
import clock from 'components/home/Assets/reloj.jpg';
import star from 'components/home/Assets/star.png';
import logo from 'components/home/Assets/radium-rocket.png';
function Home() {
  return (
    <main className={styles.generalContainer}>
      <h1 className={styles.homeH1}>Trackgenix</h1>
      <section className={styles.containerGeneral}>
        <div className={styles.sectionText}>
          <p className={styles.project}>
            This new project management methodology will provide the human resources sector with
            data so that your projections on how the company grows and operates be 100% accurate.
          </p>
          <p className={styles.project}>
            We use the latest technologies to provide the employee with an intuitive and easy-to-use
            interface. So that his only concern be is the development of various projects. Our
            business policy of seeking innovations and constant training leads us to be one of the
            leading companies in business software development. Trackgenix represents us as a
            company. It comes to provide solutions and is a tool in constant improvement.
          </p>
        </div>
        <img src={clock} alt="watch" className={styles.watch} />
      </section>
      <section className={styles.funcion}>
        <h2 className={styles.h2Home}>Funcionalities</h2>
        <div className={styles.functions}>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Timesheet</h3>
              <p className={styles.text}>Allows different users to view projects.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Reports</h3>
              <p className={styles.text}>
                Allows you to make daily reports on how different projects were carried out.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Resource Management</h3>
              <p className={styles.text}>Allows total optimization of time thanks to friendly UI</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Roles</h3>
              <p className={styles.text}>
                This tool is developed for multiple roles within the organization.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.borderline}></div>
      <section className={styles.use}>
        <h2 className={styles.h2Home}>¿Why do You use Trackgenix?</h2>
        <div className={styles.functions}>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Productivity Booster</h3>
              <p className={styles.text}>
                Allows total optimization of time thanks to the optimization of the user interface.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Team Management</h3>
              <p className={styles.text}>
                Users with special access can have full control over the application.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Word Tracking</h3>
              <p className={styles.text}>
                Word Tracking is a built in feature in Trackgenix which allows you to see the
                changes that were made to the original document. Depending on your access you can
                modify or delete them.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={star} alt="start" />
            <div className={styles.textdiv}>
              <h3 className={styles.h3Home}>Decision Making</h3>
              <p className={styles.text}>
                Accurate results enable better decision making while the project is being carried
                out.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.borderline}></div>
      <section className={styles.informacion}>
        <form>
          <h2 className={styles.h2Home}>Ask for Information</h2>
          <div className={styles.form}>
            <input type="text" name="name" className={styles.formControl} placeholder="Name" />
            <input type="text" name="email" className={styles.formControl} placeholder="Email" />
          </div>
          <p className={styles.text}>Contact Area:</p>
          <div className={styles.spaceOptions}>
            <div className={styles.labelHome}>
              <input
                className={styles.inputHome}
                name="contact-area"
                value="Human"
                type="radio"
                checked
              />
              <label>Human Resources</label>
            </div>
            <div className={styles.labelHome}>
              <input
                className={styles.inputHome}
                name="contact-area"
                value="Sistems"
                type="radio"
              />
              <label>Sistems</label>
            </div>
            <div className={styles.labelHome}>
              <input
                className={styles.inputHome}
                name="contact-area"
                value="commercialization"
                type="radio"
              />
              <label>Commercialization</label>
            </div>
          </div>
          <div className={styles.textsendreset}>
            <textarea
              className={styles.inputTextarea}
              name="comment"
              placeholder="Enter your message"
            ></textarea>
            <div className={styles.sendreset}>
              <button type="submit" className={styles.submitButton}>
                SEND MESSAGE
              </button>
              <button type="submit" className={styles.resetButton}>
                RESET
              </button>
            </div>
          </div>
        </form>
      </section>
      <section>
        <div className={styles.solution}>
          <div className={styles.sectionText}>
            <h2 className={styles.h2Home}>About Us</h2>
            <p className={styles.text}>
              We are a company dedicated to the development of software and web pages for different
              sectors of the industry. Our main objective is to provide solutions in a quick time
              but always respecting the quality of the product. That is why we have an excellent
              group of developers who are constantly training, ready to solve any problem.
            </p>
          </div>
          <img className={styles.rocketlaunch} src={logo} alt="logo-rr" />
        </div>
      </section>
      <section className={styles.filapro}>
        <div className={styles.filaprod}>
          <h4 className={styles.h4Home}>Products</h4>
          <div>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Downloads</a>
            </li>
            <li>
              <a href="#">Integrations</a>
            </li>
            <li>
              <a href="#">Extras</a>
            </li>
          </div>
        </div>
        <div className={styles.filaprod}>
          <h4 className={styles.h4Home}>Company</h4>
          <div>
            <li className={styles.white}>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Clients</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
            <li>
              <a href="#"> Blog</a>
            </li>
          </div>
        </div>
        <div className={styles.filaprod}>
          <h4 className={styles.h4Home}>Support</h4>
          <div>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Tutorials</a>
            </li>
            <li>
              <a href="#">API</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
