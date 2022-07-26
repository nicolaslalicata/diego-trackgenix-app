import { ButtonOption } from 'components/shared/buttonsOption';
import Modal from 'components/shared/modal';
import InputControlled from 'components/shared/inputControlled';
import styles from './time-sheets.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as timesheetThunks from 'redux/timesheets/thunks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const Week = (filteredList) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false, { id: '', description: '' });

  const [dayComment, setDayComment] = useState('');
  const list = filteredList.list;
  const weekDays = [];

  const schema = Joi.object({
    description: Joi.string().required().min(10).trim()
  });

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  const editComment = async (id, description) => {
    setIsOpen({ id, description });
    setValue('description', description);
  };

  const add = async (data) => {
    const newComment = {
      id: isOpen.id,
      description: data.description
    };
    dispatch(timesheetThunks.addComment(newComment));
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

  const mond = result[0].toISOString().substr(0, 10);
  const tues = result[1].toISOString().substr(0, 10);
  const wed = result[2].toISOString().substr(0, 10);
  const thurs = result[3].toISOString().substr(0, 10);
  const fri = result[4].toISOString().substr(0, 10);
  const sat = result[5].toISOString().substr(0, 10);
  const sun = result[6].toISOString().substr(0, 10);

  const monday = () => {
    const mondayDay = list.find((item) => item.startDate.toString().substr(0, 10) === mond);
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
          Week: {initialDay.substr(5, 5)} - {finalDay.substr(5, 5)}
        </h5>
        <h5>Week Total: {weekHoursTotal}</h5>
      </div>
      <div className={styles.weekDays}>
        {weekDays.map((day) => {
          return (
            <div key={day.dayNumber} className={styles.day}>
              <p>
                {day.dayName} {day.dayNumber}
              </p>
              <div className={styles.dayCard}>
                <p className={styles.dayCardTittle}>Hours:</p>
                <p className={styles.dayCardContent}>{day.hours}</p>
                <div className={styles.line}></div>
                <p className={styles.dayCardTittle}>Comment:</p>
                <input
                  type="text"
                  className={styles.dayInput}
                  value={day.comment}
                  onChange={(e) => {
                    e.preventDefault();
                    setDayComment(e.target.value);
                  }}
                />
                <input
                  type="submit"
                  className={day.id ? styles.dayButton : styles.dayButtonDisabled}
                  value={day.id ? 'Add comment' : 'Comment not available'}
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    editComment(day.id, day.comment);
                  }}
                  disabled={day.id ? '' : 'disabled'}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={'Leave a comment'} reset={reset}>
        <div className={styles.modal}></div>
        <form onSubmit={handleSubmit(add)}>
          <InputControlled
            type={'text'}
            label={'Description'}
            name="description"
            register={register}
            required
            error={errors.description}
          />
          <div className={styles.modalbuttons}>
            <ButtonOption option={'yes'} text={'Confirm'}></ButtonOption>
            <ButtonOption
              option={'no'}
              callback={() => {
                setIsOpen(false);
                reset();
              }}
              text={'Cancel'}
            ></ButtonOption>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default Week;
