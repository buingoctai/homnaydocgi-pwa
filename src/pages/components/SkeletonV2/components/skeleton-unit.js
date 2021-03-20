import React from 'react';
import '../style.scss';

function SkeletonElement({ type }) {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
}

export default SkeletonElement;
