import styles from './time-sheets.module.css';

const Week = (filteredList) => {
  const list = filteredList.list;

  let week = new Array();

  function days(current) {
    // setting gg Monday not Sunday
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
  let weekHoursTotal = 0;

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
      if (list[i].startDate.toString().substr(5, 5) === mond) {
        mondayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === tues) {
        tuesdayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === wed) {
        wednesdayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === thurs) {
        thursdayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === fri) {
        fridayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }
      if (list[i].startDate.toString().substr(5, 5) === sat) {
        saturdayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }

      if (list[i].startDate.toString().substr(5, 5) === sun) {
        sundayHours += list[i].hours;
        weekHoursTotal += list[i].hours;
        weekHours.push(list[i].hours);
      }
    }
  };

  monday();

  return (
    <div className={styles.container}>
      <div className={styles.weekHeader}>
        <h5>
          {initialDay} - {finalDay}
        </h5>
        <h5>Week Total: {weekHoursTotal}</h5>
      </div>
      <div className={styles.week}>
        <div className={styles.week}>
          <div className={styles.dayCard}>
            <p>Monday {mond.substr(3, 2)}</p>
            <p>Hours: {mondayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <p>Tuesday {tues.substr(3, 2)}</p>
            <p>Hours: {tuesdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <p>Wednesday {wed.substr(3, 2)}</p>
            <p>Hours: {wednesdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <p>Thursday {thurs.substr(3, 2)}</p>
            <p>Hours: {thursdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <p>Friday {fri.substr(3, 2)}</p>
            <p>Hours: {fridayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <p>Saturday {sat.substr(3, 2)}</p>
            <p>Hours: {saturdayHours}</p>
          </div>
          <div className={styles.dayCard}>
            <p>Sunday {sun.substr(3, 2)}</p>
            <p>Hours: {sundayHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Week;
