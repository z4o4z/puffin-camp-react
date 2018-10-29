import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.css';

export default function Content({ children, className }) {
  return <div className={`${classes.content} ${className}`}>{children}</div>;
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};
