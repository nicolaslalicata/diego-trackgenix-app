import { ButtonOption } from 'components/shared/buttonsOption';
import Modal from 'components/shared/modal';
import styles from './time-sheets.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import * as timesheetThunks from 'redux/timesheets/thunks';

const Week = (filteredList) => {
  const dispatch = useDispatch();
  const list = filteredList.list;
  console.log(list);
  const weekDays = [];
  const [comment, setComment] = useState({ id: '', comment: '' });
  const schema = Joi.object({
    description: Joi.string()
      .min(5)
      .max(30)
      .trim()
      .messages({
        'string.min': 'Description must contain 5 or more characters',
        'string.max': 'Description must contain 30 or less characters',
        'string.pattern.base': 'Description is not valid',
        'string.empty': 'This field is required'
      })
      .required()
  });

  const editTask = async (id, description) => {
    console.log(id, description);
  };

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
  let result = days(input);
  const initialDay = result[0].toISOString().substr(0, 10);
  const finalDay = result[6].toISOString().substr(0, 10);
  let weekHours = [];
  let weekHoursTotal = 0;

  // filling days with hours

  let mondayComment = '';
  let tuesdayComment = '';
  let wednesdayComment = '';
  let thursdayComment = '';
  let fridayComment = '';
  let saturdayComment = '';
  let sundayComment = '';

  const mond = result[0].toISOString().substr(0, 10);
  const tues = result[1].toISOString().substr(0, 10);
  const wed = result[2].toISOString().substr(0, 10);
  const thurs = result[3].toISOString().substr(0, 10);
  const fri = result[4].toISOString().substr(0, 10);
  const sat = result[5].toISOString().substr(0, 10);
  const sun = result[6].toISOString().substr(0, 10);

  const monday = () => {
    const mondayDay = list.find((item) => item.startDate.toString().substr(0, 10) === mond);
    console.log(mondayDay);
    if (mondayDay) {
      weekHoursTotal += mondayDay.hours;
      weekHours.push(mondayDay.hours);
      let mon = {
        dayName: 'Monday',
        dayNumber: mond.substr(8, 6),
        id: mondayDay._id,
        hours: mondayDay.hours,
        comment: mondayDay.description
      };
      weekDays.push(mon);
    } else {
      let mon = {
        dayName: 'Monday',
        dayNumber: mond.substr(8, 6),
        id: '',
        comment: ''
      };
      weekDays.push(mon);
    }

    const tuesdaDay = list.find((item) => item.startDate.toString().substr(0, 10) === tues);
    if (tuesdaDay) {
      weekHoursTotal += tuesdaDay.hours;
      weekHours.push(tuesdaDay.hours);
      let tue = {
        dayName: 'Tuesday',
        dayNumber: tues.substr(8, 6),
        id: tuesdaDay._id,
        hours: tuesdaDay.hours,
        comment: tuesdaDay.description
      };
      weekDays.push(tue);
    } else {
      let tue = {
        dayName: 'Tuesday',
        dayNumber: tues.substr(8, 6),
        id: '',
        hours: 0,
        comment: ''
      };
      weekDays.push(tue);
    }

    const wednesdayDay = list.find((item) => item.startDate.toString().substr(0, 10) === wed);
    if (wednesdayDay) {
      weekHoursTotal += wednesdayDay.hours;
      weekHours.push(wednesdayDay.hours);
      let wedn = {
        dayName: 'Wednesday',
        dayNumber: wed.substr(8, 6),
        id: wednesdayDay._id,
        hours: wednesdayDay.hours,
        comment: wednesdayDay.description
      };
      weekDays.push(wedn);
    } else {
      let wedn = {
        dayName: 'Wednesday',
        dayNumber: wed.substr(8, 6),
        id: '',
        hours: 0,
        comment: ''
      };
      weekDays.push(wedn);
    }

    const thursdayDay = list.find((item) => item.startDate.toString().substr(0, 10) === thurs);
    if (thursdayDay) {
      weekHoursTotal += thursdayDay.hours;
      weekHours.push(thursdayDay.hours);
      let thu = {
        dayName: 'Thursday',
        dayNumber: thurs.substr(8, 6),
        id: thursdayDay._id,
        hours: thursdayDay.hours,
        comment: thursdayDay.description
      };
      weekDays.push(thu);
    } else {
      let thu = {
        dayName: 'Thursday',
        dayNumber: thurs.substr(8, 6),
        id: '',
        hours: 0,
        comment: ''
      };
      weekDays.push(thu);
    }

    const fridayDay = list.find((item) => item.startDate.toString().substr(0, 10) === fri);
    if (fridayDay) {
      weekHoursTotal += fridayDay.hours;
      weekHours.push(fridayDay.hours);
      let frid = {
        dayName: 'Friday',
        dayNumber: fri.substr(8, 6),
        id: fridayDay._id,
        hours: fridayDay.hours,
        comment: fridayDay.description
      };
      weekDays.push(frid);
    } else {
      let frid = {
        dayName: 'Friday',
        dayNumber: fri.substr(8, 6),
        id: '',
        hours: 0,
        comment: ''
      };
      weekDays.push(frid);
    }

    const saturdayDay = list.find((item) => item.startDate.toString().substr(0, 10) === sat);
    if (saturdayDay) {
      weekHoursTotal += saturdayDay.hours;
      weekHours.push(saturdayDay.hours);
      let satu = {
        dayName: 'Saturday',
        dayNumber: sat.substr(8, 6),
        id: saturdayDay._id,
        hours: saturdayDay.hours,
        comment: saturdayDay.description
      };
      weekDays.push(satu);
    } else {
      let satu = {
        dayName: 'Saturday',
        dayNumber: sat.substr(8, 6),
        id: '',
        hours: 0,
        comment: ''
      };
      weekDays.push(satu);
    }

    const sundayDay = list.find((item) => item.startDate.toString().substr(0, 10) === sun);
    if (sundayDay) {
      weekHoursTotal += sundayDay.hours;
      weekHours.push(sundayDay.hours);
      let sunn = {
        dayName: 'Sunday',
        dayNumber: sun.substr(8, 6),
        id: sundayDay._id,
        hours: sundayDay.hours,
        comment: sundayDay.description
      };
      weekDays.push(sunn);
    } else {
      let sunn = {
        dayName: 'Sunday',
        dayNumber: sun.substr(8, 6),
        id: '',
        hours: 0,
        comment: ''
      };
      weekDays.push(sunn);
    }
  };

  monday();

  // const reset = () => {
  //   '';
  // };

  return (
    <div className={styles.week}>
      <div className={styles.weekHeader}>
        <h5>
          WeeK: {initialDay.substr(5, 5)} - {finalDay.substr(5, 5)}
        </h5>
        <h5>Week Total: {weekHoursTotal}</h5>
      </div>
      <div className={styles.weekDays}>
        {weekDays.map((day) => {
          return (
            <div key={day.id} className={styles.day}>
              <p>
                {day.dayName} {day.dayNumber}
              </p>
              <div className={styles.dayCard}>
                <p className={styles.dayCardTittle}>Hours:</p>
                <p className={styles.dayCardContent}>{day.hours}</p>
                <div className={styles.line}></div>
                <p className={styles.dayCardTittle}>Comment:</p>
                <input type="text" className={styles.dayInput} value={day.comment} />
                <input
                  type="submit"
                  className={styles.dayButton}
                  value={'Add comment'}
                  onClick={() => {
                    editTask(day.id, day.comment);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Week;
