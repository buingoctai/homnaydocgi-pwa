import React from 'react';

import './style.scss';

const Popover = (props) => {
  console.log('props', props);
  return <div className="container">{props.child}</div>;
};
export default Popover;
