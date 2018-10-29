import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DateTime from 'components/date-time';

import classes from './index.css';

export default function Item({ event }) {
  const {
    _id: id,
    title,
    address,
    start_date: startDate,
    finish_date: finishDate,
    hero_image_url: heroImageUrl,
  } = event;

  return (
    <Link to={`${id}`} className={classes.item}>
      <div style={{ backgroundImage: `url(${heroImageUrl})` }} className={classes.image} />

      <div className={classes.itemInner}>
        <header className={classes.header}>
          <div className={classes.headerLeft}>
            <DateTime startDate={startDate} finishDate={finishDate} />
          </div>
          <div className={classes.headerRight}>{address}</div>
        </header>

        <footer className={classes.footer}>{title}</footer>
      </div>
    </Link>
  );
}

Item.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    address: PropTypes.string,
    heroImageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
