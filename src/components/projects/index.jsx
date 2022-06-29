import ProjectsList from 'components/projects/projectsList';
import styles from './projects.module.css';

function Projects() {
  return (
    <section className={styles.container}>
      <ProjectsList />
    </section>
  );
}

export default Projects;
