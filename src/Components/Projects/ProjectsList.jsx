import { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';
import Modal from './Modal';
import ManageItem from './ManageItem';
import styles from './projects.module.css';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [modalCloseOpen, setModalCloseOpen] = useState(false);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalEditItemOpen, setModalEditItemOpen] = useState(false);

  const fetchProjects = () => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
      });
  };

  useEffect(() => {
    try {
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addItem = (userInput) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        body: JSON.stringify(userInput),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then(() => {
          fetchProjects();
          setModalAddItemOpen(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = (userInput) => {
    // eslint-disable-next-line no-unused-vars
    const { _id, __v, ...other } = userInput;
    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(other),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then(() => {
          fetchProjects();
          setModalEditItemOpen(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = () => {
    const params = { method: 'delete' };
    const id = project._id;

    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, params).then(() => {
        setModalCloseOpen(false);
        fetchProjects();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = (project) => {
    const projectWithUpdatedDates = {
      ...project,
      startDate: new Date(project.startDate).toISOString().substr(0, 10),
      endDate: new Date(project.endDate).toISOString().substr(0, 10)
    };
    setModalEditItemOpen(true);
    setProject(projectWithUpdatedDates);
  };

  const onDelete = (project) => {
    setModalCloseOpen(true);
    setProject(project);
  };

  return (
    <div className={styles.container}>
      {modalAddItemOpen && (
        <Modal
          onClose={() => setModalAddItemOpen(false)}
          onCancel={() => setModalAddItemOpen(false)}
          actionLabel="Submit"
          modalTitle="Create project"
        >
          <ManageItem handler={addItem} />
        </Modal>
      )}
      {modalEditItemOpen && (
        <Modal
          onClose={() => setModalEditItemOpen(false)}
          onCancel={() => setModalEditItemOpen(false)}
          actionLabel="Edit"
          modalTitle="Change information"
        >
          <ManageItem project={project} handler={editItem} />
        </Modal>
      )}
      {modalCloseOpen && (
        <Modal
          onClose={() => setModalCloseOpen(false)}
          onCancel={() => setModalCloseOpen(false)}
          onAction={deleteItem}
          actionLabel="Delete"
          modalTitle="Confirmation"
          showActions
        >
          <div>Are you sure you want to delete the item?</div>
        </Modal>
      )}
      <button className={styles.buttons} onClick={() => setModalAddItemOpen(true)}>
        Add
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Edit</th>
            <th>Delete</th>
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
                editHandler={() => onEdit(project)}
                deleteHandler={() => onDelete(project)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsList;
