import { useEffect, useState } from 'react';
import styles from './projects.module.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Project</h2>
      <div>
        {projects.map((project) => {
          return (
            <div
              key={project.name}
              isActive={project.isActive}
              description={project.description}
              client={project.client}
              startDate={project.startDate}
              endDate={project.endDate}
              members={project.members}
            ></div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
