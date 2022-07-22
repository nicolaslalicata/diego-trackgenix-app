import styles from './time-sheets.module.css';
import { useSelector } from 'react-redux';

const Week = (props) => {
  const list = useSelector((state) => state.timeSheets.timeSheetsList);

  let week = new Array();

  function days(current) {
    // Starting Monday not Sunday
    let first = current.getDate() - current.getDay() + 1;
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current.setDate(first++)));
    }
    return week;
  }

  let input = new Date();
  // console.log('input: %s', input);

  let result = days(input);
  // console.log(result.map((d) => d.toString()));

  const initialDay = result[0].toString().substr(4, 6);
  // console.log('initialDay: %s', initialDay);
  const finalDay = result[6].toString().substr(4, 6);
  let weekHours = [];
  let weekObj = { day: [], hours: [] };

  // filling days with hours

  let mondayHours = 0;
  let tuesdayHours = 0;
  let wednesdayHours = 0;
  let thursdayHours = 0;
  let fridayHours = 0;
  let saturdayHours = 0;
  let sundayHours = 0;

  const mond = result[0].toISOString().substr(5, 5);
  const tues = result[1].toISOString().substr(5, 5);
  const wed = result[2].toISOString().substr(5, 5);
  const thurs = result[3].toISOString().substr(5, 5);
  const fri = result[4].toISOString().substr(5, 5);
  const sat = result[5].toISOString().substr(5, 5);
  const sun = result[6].toISOString().substr(5, 5);

  const monday = () => {
    for (let i = 0; i < list.length; i++) {
      // console.log(list[i].startDate.toString().substr(5, 5));
      if (list[i].startDate.toString().substr(5, 5) === mond) {
        // console.log('coincidencia', list[i].startDate.substr(0, 10));
        mondayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === tues) {
        tuesdayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === wed) {
        wednesdayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === thurs) {
        thursdayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === fri) {
        fridayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === sat) {
        saturdayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }

      if (list[i].startDate.toString().substr(5, 5) === sun) {
        sundayHours += list[i].hours;
        weekHours.push(list[i].hours);
      }
    }
  };

  monday();

  return (
    <div className={styles.container}>
      <div className={styles.weekHeader}>
        <h4>
          Week: {initialDay} - {finalDay}
        </h4>
      </div>
      <div className={styles.week}>
        <div className={styles.week}>
          <div className={styles.dayCard}>
            <h5>Monday {mond.substr(3, 2)}</h5>
            <p>Hours: {mondayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <h5>Tuesday {tues.substr(3, 2)}</h5>
            <p>Hours: {tuesdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <h5>Wednesday {wed.substr(3, 2)}</h5>
            <p>Hours: {wednesdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <h5>Thursday {thurs.substr(3, 2)}</h5>
            <p>Hours: {thursdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <h5>Friday {fri.substr(3, 2)}</h5>
            <p>Hours: {fridayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <h5>Saturday {sat.substr(3, 2)}</h5>
            <p>Hours: {saturdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <h5>Sunday {sun.substr(3, 2)}</h5>
            <p>Hours: {sundayHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Week;
