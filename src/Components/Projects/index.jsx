import ProjectsList from './ProjectsList';
import styles from './projects.module.css';

function Projects() {
  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <ProjectsList />
    </section>
  );
}

export default Projects;
