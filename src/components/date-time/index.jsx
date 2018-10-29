import React from 'react';
// import moment from 'moment';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

export default function DateTime({ startDate, finishDate }) {
  const startDay = format(startDate, 'D');
  const startTime = format(startDate, 'HH:mm');
  const startMonth = format(startDate, 'MMMM');
  const finishDay = format(finishDate, 'D');
  const finishTime = format(finishDate, 'HH:mm');
  const finishMonth = format(finishDate, 'MMMM');

  let dateTime = '';

  if (startTime !== '00:00') {
    dateTime += `${startTime} `;
  }

  if (finishTime !== '00:00') {
    dateTime += `- ${finishTime} `;
  }

  if (startMonth !== finishMonth) {
    dateTime += `${format(startDate, 'D MMMM')} - ${format(finishDate, 'D MMMM')}`;
  } else if (startDay !== finishDay) {
    dateTime += `${startDay} - ${format(finishDate, 'D MMMM')}`;
  } else {
    dateTime += `${format(startDate, 'D MMMM')}`;
  }

  return <div>{dateTime}</div>;
}

DateTime.propTypes = {
  startDate: PropTypes.string.isRequired,
  finishDate: PropTypes.string.isRequired,
};
