import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from 'components/shared/table';
import Button from 'components/shared/buttons';
import ModalAddTimeSheet from 'components/timesheets/addAndModal';
import ModalTimeSheetEdit from 'components/timesheets/editAndModal';
import ModalDeleteConfirmation from 'components/timesheets/modalDeleteConfirmation';
import Loader from 'components/shared/loading';
import { useDispatch, useSelector } from 'react-redux';
import * as timesheetThunks from 'redux/timesheets/thunks';
import * as projectsThunks from 'redux/projects/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import * as tasksThunks from 'redux/tasks/thunks';
const TimeSheets = () => {
  const [timeSheet, setTimesheet] = useState({
    description: '',
    taskId: '',
    validated: '',
    employeeId: [],
    projectId: '',
    startDate: '2022-06-08T00:00:00.000Z',
    endDate: '2022-06-08T00:00:00.000Z',
    hours: ''
  });
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.timeSheets.timeSheetsList);
  const projects = useSelector((state) => state.projects.projectsList);
  const employees = useSelector((state) => state.employees.employeesList);
  const tasks = useSelector((state) => state.tasks.tasksList);
  const isFetchingTimesheets = useSelector((state) => state.timeSheets.isLoading);
  const isFetchingProjects = useSelector((state) => state.projects.loading);
  const isFetchingEmployees = useSelector((state) => state.employees.isLoading);
  const isFetchingTasks = useSelector((state) => state.tasks.isLoading);

  const onDelete = (timesheet) => {
    setIsModalDelete(true);
    setTimesheet(timesheet);
  };
  const onEdit = (timesheet) => {
    setIsModalEdit(true);
    setTimesheet(timesheet);
  };

  const getData = () => {
    return list.map((timesheet) => {
      return {
        ...timesheet,
        createdAt: new Date(timesheet.createdAt).toISOString().substr(0, 10),
        startDate: new Date(timesheet.startDate).toISOString().substr(0, 10),
        endDate: new Date(timesheet.endDate).toISOString().substr(0, 10),
        project: timesheet.projectId.name,
        employee: timesheet.employeeId.lastName,
        validated: timesheet.validated.toString() === 'true' ? 'Yes' : 'No',
        edit: (
          <Button
            icons="edit"
            callback={() => {
              onEdit(timesheet);
            }}
          />
        ),
        delete: <Button icons="delete" callback={() => onDelete(timesheet)} />
      };
    });
  };

  useEffect(async () => {
    try {
      await timesheetThunks.getTimeSheets()(dispatch);
      projectsThunks.getProjects()(dispatch);
      employeesThunks.getEmployees()(dispatch);
      tasksThunks.getTasks()(dispatch);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isFetchingProjects || isFetchingEmployees || isFetchingTasks) {
    return <Loader isLoading={isFetchingProjects || isFetchingEmployees || isFetchingTasks} />;
  } else {
    return (
      <section className={styles.listSection}>
        <div>
          <Button
            icons={'add'}
            callback={() => {
              setIsModalAdd(true);
            }}
          />
        </div>
        <ModalAddTimeSheet
          isModalAdd={isModalAdd}
          setIsModalAdd={setIsModalAdd}
          fetchTimeSheets={() => timesheetThunks.getTimeSheets()(dispatch)}
          employees={employees}
          tasks={tasks}
          projects={projects}
        ></ModalAddTimeSheet>
        <Table
          data={getData()}
          objProp={[
            'employee',
            'project',
            'startDate',
            'endDate',
            'hours',
            'validated',
            'createdAt',
            'description',
            'edit',
            'delete'
          ]}
          headers={[
            'Employee',
            'Project',
            'Start Date',
            'End Date',
            'Hours',
            'Validated',
            'Created At',
            'Description',
            'Edit',
            'Delete'
          ]}
        ></Table>
        <ModalDeleteConfirmation
          deleteTimeSheet={timesheetThunks.deleteTimeSheet}
          timeSheet={timeSheet}
          dispatch={dispatch}
          setIsModalDelete={setIsModalDelete}
          isModalDelete={isModalDelete}
        ></ModalDeleteConfirmation>
        <ModalTimeSheetEdit
          isModalEdit={isModalEdit}
          setIsModalEdit={setIsModalEdit}
          fetchTimeSheets={timesheetThunks.getTimeSheets}
          timeSheet={timeSheet}
          employees={employees}
          tasks={tasks}
          projects={projects}
        ></ModalTimeSheetEdit>
      </section>
    );
  }
};

export default TimeSheets;
