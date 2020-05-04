import moment, { Moment } from 'moment';

export const disabledDate = (currentDate?: Moment) => {
  if (currentDate) {
    const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'));

    return dateIsBeforeEndOfDay;
  } else {
    return false;
  }
};
