import { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';
import styles from './projects.module.css';
function ProjectsList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    try {
      fetch(`http://localhost:4000/projects`)
        .then((response) => response.json())
        .then((response) => {
          setProjects(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <ProjectItem
                key={project._id}
                id={project._id}
                name={project.name}
                client={project.client}
                description={project.description}
                isActive={project.isActive}
                endDate={project.endDate}
                startDate={project.startDate}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsList;
